import { GoogleGenerativeAI } from "@google/generative-ai";

// The user should provide their own API key. 
// For now, we'll try to get it from environment variables or a local storage fallback.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (prompt: string, imageBase64?: string) => {
  if (!API_KEY) {
    return "Please set your VITE_GEMINI_API_KEY in the environment or app settings.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    if (imageBase64) {
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageBase64.split(",")[1] || imageBase64,
            mimeType: "image/jpeg",
          },
        },
      ]);
      return result.response.text();
    } else {
      const result = await model.generateContent(prompt);
      return result.response.text();
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I encountered an error. Please check your API key and connection.";
  }
};
