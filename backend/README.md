# KaarigarAI Backend

This is the Node.js Express backend for KaarigarAI.

## WhatsApp Webhook Integration

KaarigarAI includes a powerful Twilio-powered WhatsApp Webhook (`POST /api/whatsapp`). Artisans can text this bot to automatically generate their marketing content!

### Features
- **Send a Photo**: Auto-generates a gorgeous, SEO-optimized product listing.
- **"story"**: Generates a 150-word heritage story for the last uploaded product.
- **"price"**: Appraises the last product and suggests a low/mid/high price range.
- **"instagram"**: Generates 3 Instagram captions with hashtags.
- **"hindi" / "english"**: Togles the artisan's preferred language. All future responses will be autotranslated!

### Setup Instructions

1. **Environment Variables**
Create a `.env` file in this `backend/` directory with the following keys:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# Google Translate API Configuration
GOOGLE_TRANSLATE_API_KEY=your_translate_api_key

# Firebase Admin Configuration (For saving WhatsApp state)
FIREBASE_CONFIG={"type":"service_account","project_id":"..."}
```

2. **Run ngrok for the Webhook**
Since your backend is running locally on port 5000, Twilio cannot reach it over the internet. You must use `ngrok` to expose your local server:
```bash
npx ngrok http 5000
```
This will give you a public URL like `https://1234-abcd.ngrok-free.app`.

3. **Configure Twilio Sandbox**
- Go to the [Twilio Console](https://console.twilio.com/).
- Navigate to **Messaging > Try it out > Send a WhatsApp message**.
- Connect to the sandbox by sending the join code to the Twilio number.
- Go to the **Sandbox Settings** tab.
- Set the **"WHEN A MESSAGE COMES IN"** URL to: `https://YOUR_NGROK_URL/api/whatsapp`
- Save the settings!

Now, just send a photo of a craft to your Twilio Sandbox number on WhatsApp and watch the AI work its magic!
