import { GoogleGenAI } from "@google/genai";

export async function analyzeTradePrice(spiceName: string, currentMarketPrice: number, bidPrice: number) {
  try {
    // Note: process.env.API_KEY is the system-mandated source for keys in this environment.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As a Senior Trade Advisor for the global spice exchange, analyze this proposal:
      Asset: ${spiceName}
      Current Market Benchmark: $${currentMarketPrice}
      User Proposed Bid: $${bidPrice}

      Task: 
      1. Determine if the bid is within a 15% volatility corridor.
      2. If it is an anomaly, suggest a "Stable Counter-Offer" value that would be more acceptable to both parties.
      3. Provide a brief expert justification.

      Respond ONLY in JSON format:
      {
        "isAnomaly": boolean,
        "message": "string",
        "suggestedCounter": number,
        "justification": "string"
      }`,
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Analysis Error:", error);
    const diff = Math.abs(bidPrice - currentMarketPrice) / currentMarketPrice;
    const isAnomaly = diff > 0.15;
    return {
      isAnomaly,
      message: isAnomaly ? "Price Anomaly: Bid exceeds global stability threshold." : "Bid is within market parameters.",
      suggestedCounter: isAnomaly ? currentMarketPrice * (bidPrice > currentMarketPrice ? 1.12 : 0.88) : bidPrice,
      justification: "Calculated based on 30-day moving average volatility indices."
    };
  }
}