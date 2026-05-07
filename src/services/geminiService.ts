import { GoogleGenAI } from "@google/genai";
import { MenuItem } from "../constants";

let genAI: GoogleGenAI | null = null;

function getAIClient() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please configure it in your environment variables.");
    }
    genAI = new GoogleGenAI(apiKey as any);
  }
  return genAI;
}

export async function getMealRecommendation(userPrompt: string, menuItems: MenuItem[]) {
  const menuContext = menuItems.map(item => 
    `${item.name}: ${item.description} (Tags: ${item.tags.join(', ')})`
  ).join('\n');

  try {
    const ai = getAIClient();
    // According to most SDK versions, it's getGenerativeModel
    const model = (ai as any).getGenerativeModel({ model: "gemini-1.5-flash" }); 
    
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{
          text: `
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
          `
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(result.response.text() || '{}');
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return null;
  }
}
