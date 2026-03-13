import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: 'Tell me a joke.'
    });
    console.log(response.text);
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
