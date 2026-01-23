
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { DiseaseAnalysis } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
/**
 * Advanced Multi-Stage Image Preprocessing Pipeline
 */
const preprocessImage = async (base64Image: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(base64Image);
        return;
      }

      const MAX_SIZE = 1400;
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.filter = 'contrast(1.25) brightness(1.1) saturate(1.2) blur(0.3px) sepia(0.05)';
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      const output = ctx.createImageData(width, height);
      const outPixels = output.data;

      const kernel = [
        -0.1, -0.1, -0.1,
        -0.1,  1.8, -0.1,
        -0.1, -0.1, -0.1
      ];

      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          for (let c = 0; c < 3; c++) {
            let sum = 0;
            for (let ky = 0; ky < 3; ky++) {
              for (let kx = 0; kx < 3; kx++) {
                const idx = ((y + ky - 1) * width + (x + kx - 1)) * 4 + c;
                sum += pixels[idx] * kernel[ky * 3 + kx];
              }
            }
            const outIdx = (y * width + x) * 4 + c;
            outPixels[outIdx] = Math.min(255, Math.max(0, sum));
            outPixels[outIdx + 3] = 255;
          }
        }
      }
      ctx.putImageData(output, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.9).split(',')[1]);
    };
    img.onerror = () => resolve(base64Image);
    img.src = base64Image.startsWith('data:') ? base64Image : `data:image/jpeg;base64,${base64Image}`;
  });
};

export const analyzeCropDisease = async (base64Image: string, language: 'en' | 'ur' | 'hi' = 'en'): Promise<DiseaseAnalysis> => {
  const ai = getAI();
  const enhancedImage = await preprocessImage(base64Image);
  const langPrompt = language === 'ur' ? "Provide response in Urdu script." : language === 'hi' ? "Provide response in Hindi script." : "Provide response in English.";
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: enhancedImage,
          },
        },
        {
          text: `Act as a world-class senior plant pathologist from SKUAST-K Kashmir. 
          The provided image has been preprocessed to reveal high-frequency textures.
          Analyze this plant image for agricultural diseases specific to the Kashmir Valley. 
          ${langPrompt} 
          Provide details in strict JSON format:
          {
            "diseaseName": "Scientific and common name",
            "severity": "Low/Medium/High",
            "confidence": 0.0 to 1.0,
            "description": "Detailed clinical signs observed",
            "treatment": ["List of specific SKUAST-K approved chemical or organic remedies"],
            "preventiveMeasures": ["Specific cultural practices"]
          }`,
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diseaseName: { type: Type.STRING },
          severity: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          description: { type: Type.STRING },
          treatment: { type: Type.ARRAY, items: { type: Type.STRING } },
          preventiveMeasures: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["diseaseName", "severity", "confidence", "description", "treatment", "preventiveMeasures"]
      }
    },
  });

  return JSON.parse(response.text || '{}');
};

export const getDeepExpertView = async (base64Image: string, diseaseName: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: `You are a world-class AI Agricultural Scientist. The diagnosis identified this as ${diseaseName}. Provide an advanced report with bio-cycle, triggers, and long-term management. Markdown format.` }
      ]
    },
    config: { thinkingConfig: { thinkingBudget: 1000 } }
  });
  return response.text || "Expert analysis currently unavailable.";
};

export const generateUrduDiagnosisAudio = async (analysis: DiseaseAnalysis) => {
  const ai = getAI();
  const prompt = `As a friendly female agricultural expert from Kashmir, speak the following diagnosis in clear Urdu. 
  Start with: "As-salamu alaykum. Aap ki fasal ka mushahida karne ke baad, hamein ${analysis.diseaseName} ki nishandahi hui hai."`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

export const getExpertAdvice = async (history: { role: string; parts: { text: string }[] }[], prompt: string, language: 'en' | 'ur' | 'hi' = 'en') => {
  const ai = getAI();
  const langInstruction = {
    ur: "Speak and write primarily in Urdu (اردو).",
    hi: "Speak and write primarily in Hindi (हिंदी).",
    en: "Speak and write primarily in English."
  }[language];

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [...history.map(h => ({ role: h.role, parts: h.parts })), { role: 'user', parts: [{ text: prompt }] }],
    config: {
      systemInstruction: `You are 'Towseef Ahmad', a world-class agricultural expert specializing in the Kashmir Valley. 
      ${langInstruction}
      Your advice is strictly localized to the temperate climate of Jammu & Kashmir and must align with SKUAST-K guidelines.
      Use a polite, fatherly, and professional tone.`,
      tools: [{ googleSearch: {} }]
    },
  });
  return response.text;
};

export const getDistrictWeather = async (district: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Retrieve current weather for ${district}, J&K. JSON format.`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          temperature: { type: Type.STRING },
          condition: { type: Type.STRING },
          precipitation: { type: Type.STRING },
          humidity: { type: Type.STRING },
          windSpeed: { type: Type.STRING },
          forecast: { type: Type.STRING },
          farmerTip: { type: Type.STRING },
          urduSummary: { type: Type.STRING }
        },
        required: ["temperature", "condition", "precipitation", "forecast", "farmerTip"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const findNearbyMandis = async (lat: number, lng: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Find Fruit and Vegetable Mandis near ${lat}, ${lng} in Kashmir.`,
    config: {
      tools: [{ googleMaps: {} }, { googleSearch: {} }],
      toolConfig: { retrievalConfig: { latLng: { latitude: lat, longitude: lng } } }
    },
  });
  return { text: response.text, sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks };
};

export const findNearbyDealers = async (lat: number, lng: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Find pesticide dealers near ${lat}, ${lng} in Kashmir.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: { retrievalConfig: { latLng: { latitude: lat, longitude: lng } } }
    },
  });
  return { text: response.text, sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks };
};

export const analyzeLivestockHealth = async (base64Image: string, animalType: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: `Analyze livestock health for a ${animalType} in J&K. JSON format.` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          condition: { type: Type.STRING },
          severity: { type: Type.STRING },
          advice: { type: Type.STRING },
          urduSummary: { type: Type.STRING }
        },
        required: ["condition", "severity", "advice", "urduSummary"]
      }
    },
  });
  return JSON.parse(response.text || '{}');
};

export const predictYield = async (data: { landSize: number; crop: string; age: number; variety: string; health: string }) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Predict harvest yield for ${data.crop} in Kashmir. JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          estimatedYield: { type: Type.STRING },
          marketValue: { type: Type.STRING },
          riskFactors: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["estimatedYield", "marketValue", "riskFactors"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};
