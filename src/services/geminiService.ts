import { GoogleGenAI } from "@google/genai";
import { MenuItem } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getMealRecommendation(userPrompt: string, menuItems: MenuItem[]) {
  const menuContext = menuItems.map(item => 
    `${item.name}: ${item.description} (Tags: ${item.tags.join(', ')})`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        You are a world-class Ethiopian food expert and concierge. 
        The current menu includes:
        ${menuContext}

        The user is asking: "${userPrompt}"

        Recommend exactly one dish from the menu that best fits their request. 
        Return ONLY a valid JSON object in this format:
        {
          "itemName": "Name of the dish",
          "reasoning": "A one-sentence elegant explanation of why this fits their vibe.",
          "funFact": "One culturally rich traditional fact about this dish."
        }
      `,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return null;
  }
}
