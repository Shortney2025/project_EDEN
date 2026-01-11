
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzePlantImage = async (base64Image: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: [
      {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType: "image/jpeg" } },
          { text: "Analyze this image for Project Eden. Determine if it shows: 1. A recently watered tree (to verify a daily streak). 2. An invasive species (Tree of Heaven, Kudzu, Knotweed, Thistle). 3. A recycling receipt or bin. Return a JSON object with 'type' (watered_tree, invasive, recycling, unknown), 'species' (if applicable), 'confidence' (0-1), and 'message' (a brief helpful tip)." }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING },
          species: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          message: { type: Type.STRING },
        },
        required: ["type", "message"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return { type: 'unknown', message: 'Could not clarify analysis.' };
  }
};

export const getEnvironmentalData = async (lat: number, lng: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Analyze the environment near coordinates: ${lat}, ${lng}. 
    Provide:
    1. A general solar-punk summary of the ecosystem.
    2. Specific Real-time Alerts if any (e.g., high PM2.5/pollution, extreme heat/weather warnings, or active community reforestation drives happening now).
    Format the response as Markdown with a clear 'ALERTS' section if there are active events.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: { latitude: lat, longitude: lng }
        }
      }
    }
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const getPlantingGuides = async (topic: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Provide an educational guide for: ${topic}. 
    - If it's about planting, cover trees AND other native vegetation/plants suitable for local biospheres. Focus on 'Trunk Flare', 'Mulch Donuts', and deep-rooting native species.
    - If it's about invasive species, include a MANDATORY 'PPE & Safety Gear' section (heavy-duty gloves, eye protection, long sleeves, mask for spores) and proper bio-hazard disposal techniques.
    - If it's about recycling, focus on circular economy practices, specialty waste (e-waste, chemicals), and localized recycling protocols.
    Be concise, encouraging, and emphasize living in harmony with the biosphere.`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const getLocalResources = async (lat: number, lng: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Find local environmental resources and community events for a user at (Coords: ${lat}, ${lng}). 
    Search for:
    1. Local recycling hubs and city-specific waste diversion programs.
    2. Tree planting events, community gardens, or native plant workshops happening in the user's city.
    3. Meetups for 'like-minded people' (environmental volunteer groups, Earth-saving collectives).
    4. City-specific sustainability dashboards or links.
    Provide a warm, encouraging summary about becoming self-aware and harmonizing with the local biosphere. Ensure grounding metadata includes clickable URLs.`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  return {
    text: response.text,
    chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};
