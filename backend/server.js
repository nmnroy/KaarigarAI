import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';
import twilio from 'twilio';
import { Translate } from '@google-cloud/translate/build/src/v2/index.js';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// Twilio sends data as form-urlencoded, so we need this middleware
app.use(express.urlencoded({ extended: true }));

// --- Google APIs & Twilio Initialization ---
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY || process.env.GEMINI_API_KEY }); 

const twilioClient = process.env.TWILIO_ACCOUNT_SID 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

// Set up Multer for memory storage (for image uploads to API)
const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
  res.send('KaarigarAI Backend is running. You can access the API at /api/health');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'KaarigarAI Backend is running.' });
});

app.post('/api/generate', upload.single('image'), async (req, res) => {
  try {
    const { description, artisanName, craftName, region } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Product image is required.' });
    }

    // Convert file to base64
    const base64Image = file.buffer.toString('base64');
    
    const prompt = `
      You are a cultural marketing expert specializing in Indian handicrafts. Generate marketing content that honors the heritage and story behind each craft.
      
      Artisan's Name: ${artisanName || 'Unknown Artisan'}
      Craft Name: ${craftName || 'Unknown Craft'}
      Region of India: ${region || 'Unknown Region'}
      Artisan's Description: "${description || 'No description provided.'}"

      Analyze the attached image and generate the following content. Return the result strictly in valid JSON format with the following keys:
      {
        "heritageStory": "A 150-word emotional and authentic heritage story about the craft and origin.",
        "productListing": {
          "title": "SEO optimized title",
          "description": "Around 200 word detailed description of the product",
          "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10"]
        },
        "instagramCaptions": [
          "Caption 1 (under 150 characters with hashtags)",
          "Caption 2 (under 150 characters with hashtags)",
          "Caption 3 (under 150 characters with hashtags)"
        ],
        "pricing": {
          "low": "Suggested low price in INR",
          "mid": "Suggested mid price in INR",
          "high": "Suggested high price in INR",
          "justification": "Brief justification for the price ranges"
        }
      }
      Do not include any markdown formatting like \`\`\`json in the response, just the raw JSON object.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            { 
              inlineData: { 
                mimeType: req.file.mimetype, 
                data: base64Image 
              } 
            }
          ]
        }
      ]
    });

    const outputText = response.text;
    
    // Attempt to parse JSON response
    let jsonResult;
    try {
      // Sometimes Gemini wraps JSON in markdown blocks even if asked not to
      const cleanedText = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
      jsonResult = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response', parseError, outputText);
      return res.status(500).json({ error: 'Failed to generate content format.' });
    }

    res.json(jsonResult);
  } catch (error) {
    console.error('Error generating AI content:', error);
    res.status(500).json({ error: 'Internal server error processing the AI request.' });
  }
});

// Helper for WhatsApp state via memory if Firebase isn't configured
const memoryState = {};

// Helper to translate outbound messages
async function translateText(text, targetLangCode) {
  if (!targetLangCode || targetLangCode === 'en' || !process.env.GOOGLE_TRANSLATE_API_KEY) return text;
  try {
    const [translation] = await translate.translate(text, targetLangCode);
    return translation;
  } catch (err) {
    console.error('Translation failed:', err);
    return text;
  }
}

// --- WhatsApp Webhook ---
app.post('/api/whatsapp', async (req, res) => {
  const incomingMsg = req.body.Body ? req.body.Body.trim().toLowerCase() : '';
  const mediaUrl = req.body.MediaUrl0;
  const fromNumber = req.body.From;

  const twiml = new twilio.twiml.MessagingResponse();
  let responseMessage = "";
  
  // Track state
  let artisanState = memoryState[fromNumber] || { language: 'en', lastProductContext: null };

  try {
    if (mediaUrl) {
      // 1. Photo received - Generate Product Listing
      
      // Fetch the image from Twilio URL
      const imageResponse = await fetch(mediaUrl);
      const arrayBuffer = await imageResponse.arrayBuffer();
      const base64Image = Buffer.from(arrayBuffer).toString('base64');
      const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';

      const prompt = `
        You are a cultural marketing expert for KaarigarAI. 
        Analyze the attached image of this handmade Indian product.
        Provide a beautifully written, SEO-optimized title and a 100-word product description.
        Don't describe the photo itself, describe the product as if selling it on a marketplace.
      `;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [ { text: prompt }, { inlineData: { mimeType, data: base64Image } } ] }
        ]
      });

      artisanState.lastProductContext = aiResponse.text; // Save the base description in state
      artisanState.lastImageMime = mimeType;
      artisanState.lastImageBase64 = base64Image;

      responseMessage = `✨ Beautiful! I've created a listing for this item:\n\n${aiResponse.text}\n\nReply with 'story' for a heritage story, 'price' for suggestions, or 'instagram' for captions!`;

    } else if (incomingMsg === 'story') {
      // 2. Text command: 'story'
      if (!artisanState.lastProductContext) {
        responseMessage = "Please upload a photo of your craft first so I know what to write a story about!";
      } else {
        const prompt = `Based on this product: "${artisanState.lastProductContext}", write a 150-word emotional and authentic heritage story about the craft and its origins in India.`;
        const aiResponse = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        responseMessage = `📖 Heritage Story:\n\n${aiResponse.text}`;
      }
    } else if (incomingMsg === 'price') {
      // 3. Text command: 'price'
      if (!artisanState.lastProductContext) {
         responseMessage = "Please upload a photo of your craft first so I can appraise it!";
      } else {
        const prompt = `Based on this handmade Indian product: "${artisanState.lastProductContext}", suggest a fair pricing strategy in INR. Provide a Low, Mid, and High range with a 2-sentence justification. Maintain a professional, supportive tone.`;
        const aiResponse = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        responseMessage = `💰 Pricing Strategy:\n\n${aiResponse.text}`;
      }
    } else if (incomingMsg === 'instagram') {
      // 4. Text command: 'instagram'
       if (!artisanState.lastProductContext) {
         responseMessage = "Please upload a photo of your craft first so I can write captions!";
      } else {
        const prompt = `Based on this amazing handmade Indian product: "${artisanState.lastProductContext}", write 3 distinct Instagram captions. Keep them under 150 characters each and include 4 relevant hashtags. Number them 1, 2, 3.`;
        const aiResponse = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        responseMessage = `📱 Instagram Captions:\n\n${aiResponse.text}`;
      }
    } else if (incomingMsg === 'hindi' || incomingMsg === 'english') {
       // Language toggle
       artisanState.language = incomingMsg === 'hindi' ? 'hi' : 'en';
       responseMessage = incomingMsg === 'hindi' ? 'आपकी भाषा हिंदी में सेट कर दी गई है! (Language set to Hindi)' : 'Language set to English!';
    } else {
      // 5. Default Fallback
      responseMessage = "Namaste! I am KaarigarAI. 🏺\n\nPlease send me a *photo of your craft* and I will automatically generate a beautiful catalog listing for it.\n\nYou can also reply 'hindi' to switch language.";
    }

    // Translate outbound if user is in Hindi
    if (artisanState.language === 'hi' && incomingMsg !== 'hindi' && incomingMsg !== 'english') {
      responseMessage = await translateText(responseMessage, 'hi');
    }

    // Save state back to memory layer
    memoryState[fromNumber] = artisanState;

  } catch (error) {
    console.error("WhatsApp Webhook Error:", error);
    responseMessage = "Sorry, I had trouble processing that request. Please try again.";
  }

  // Send Twilio Response
  twiml.message(responseMessage);
  res.set('Content-Type', 'text/xml');
  res.send(twiml.toString());
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
