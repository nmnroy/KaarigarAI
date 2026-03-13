# 🏺 KaarigarAI

**KaarigarAI** is an AI-powered marketplace assistant built to empower Indian artisans. It breaks down digital barriers by converting simple product photos into robust, SEO-ready marketplace listings, heritage stories, social media captions, and data-driven pricing strategies.

![KaarigarAI Demo](frontend/public/screenshots/demo.png)

Designed for accessibility, KaarigarAI works across languages (English & Hindi) and integrates directly via WhatsApp, ensuring artisans in the most rural communities can reach global markets without needing complex software skills.

---

## ✨ Key Features

![KaarigarAI Features](frontend/public/screenshots/features.png)

- **Heritage Story Generator**: Automatically crafts authentic, culturally accurate background stories for the artisan's specific craft (e.g., Kantha, Madhubani).
- **Marketplace Listing Creator**: Generates SEO-optimized titles, product descriptions, and keywords ready for Etsy, Amazon, or Shopify.
- **Smart Appraisals (Pricing)**: Calculates a data-driven low, optimal, and premium price range in INR based on the uploaded product image.
- **Social Media Assistant**: Creates multiple ready-to-use Instagram captions with relevant hashtags.
- **WhatsApp Webhook**: Artisans can text a photo and a brief voice note to our Twilio bot to receive translated listings instantly.
- **Pitch Deck Mode**: Contains a built-in React component for presenting the project seamlessly at hackathons (`/pitch`).

![How KaarigarAI Works](frontend/public/screenshots/steps.png)


---

## 🛠 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS (Custom earthy palette: Saffron, Terracotta, Cream).
- **Backend**: Node.js, Express.
- **AI/ML**: Google Gemini 1.5 Pro Multimodal API (Vision & Text).
- **Language**: Google Cloud Translation API.
- **Communication**: Twilio WhatsApp API.

---

## 🚀 Getting Started

To run this project locally, you will need Node.js installed. Note that to run the WhatsApp integration, you will require Twilio and ngrok.

### 1. Clone the repository
```bash
git clone https://github.com/nmnroy/KaarigarAI.git
cd KaarigarAI
```

### 2. Setup the Backend
Modify the `.env` file in the `backend` folder with your actual API keys:
```bash
cd backend
npm install

# Create a .env file with the following:
# PORT=5000
# GEMINI_API_KEY=your_gemini_api_key
# GOOGLE_TRANSLATE_API_KEY=your_translate_api_key
# TWILIO_ACCOUNT_SID=your_twilio_sid
# TWILIO_AUTH_TOKEN=your_twilio_auth_token
# FIREBASE_CONFIG=your_firebase_json

npm run dev
```
*Your backend will be live at `http://localhost:5000`.*

### 3. Setup the Frontend
Open a new terminal window to start the Vite application.
```bash
cd frontend
npm install
npm run dev
```
*Your frontend will be live at `http://localhost:5173`.*

---

## 🌍 Built for Bharat
KaarigarAI was built to preserve India's immense cultural heritage while equipping local creators with next-generation AI tools. 
> *"From Your Hands to the World."*
