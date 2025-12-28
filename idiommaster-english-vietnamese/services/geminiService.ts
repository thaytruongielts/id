
import { GoogleGenAI, Type } from "@google/genai";
import { AIExplanation } from "../types";

export const fetchIdiomExplanation = async (idiomEn: string, idiomVn: string): Promise<AIExplanation | null> => {
  try {
    // Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a detailed explanation for the English idiom: "${idiomEn}". It means "${idiomVn}" in Vietnamese.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meaning: { type: Type.STRING, description: "The core meaning of the idiom." },
            origin: { type: Type.STRING, description: "The historical origin or why it is phrased this way." },
            example: { type: Type.STRING, description: "A natural English example sentence." },
            vietnameseContext: { type: Type.STRING, description: "Equivalent Vietnamese proverb or cultural context." }
          },
          required: ["meaning", "origin", "example", "vietnameseContext"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim());
    }
    return null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
