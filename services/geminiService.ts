
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLoveLetter = async (details: string, recipient: string): Promise<string> => {
  const ai = getAI();
  const prompt = `Write a deeply romantic, poetic, and heartwarming Valentine's Day message for ${recipient}. 
  Base it on these details: ${details}. 
  The tone should be sincere and elegant. Keep it between 80-150 words. Do not use generic placeholders.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });
    return response.text || "My love for you grows with every passing moment...";
  } catch (error) {
    console.error("Error generating letter:", error);
    return "I tried to find the words to describe how much I love you, but even the AI was speechless. You are my everything.";
  }
};

export const generateRomanticImage = async (prompt: string): Promise<string | null> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A beautiful, high-quality, romantic, and artistic Valentine's Day themed illustration of: ${prompt}. Soft lighting, warm colors, dreamy atmosphere.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
