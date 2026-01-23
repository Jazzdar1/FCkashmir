import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchNewsTicker = async (category: 'kashmir' | 'sports' | 'latest') => {
  const ai = getAI();
  const prompts = {
    kashmir: "List 5 latest breaking news headlines from Jammu and Kashmir (Greater Kashmir, Rising Kashmir, Daily Excelsior). Format as short sentences separated by ' • '.",
    sports: "List 5 latest sports headlines focused on Cricket (IPL, International, JKCA). Format as short sentences separated by ' • '.",
    latest: "List 5 top global news headlines from the last 6 hours. Format as short sentences separated by ' • '."
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp', // Adjusted to latest stable model or use your preferred model
      contents: prompts[category],
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    // FIX: Provide a default string if response.text is undefined
    const text = response.text ?? "News updates currently unavailable.";
    return text.replace(/\n/g, ' ').trim();
  } catch (e) {
    return "Updating live feed...";
  }
};