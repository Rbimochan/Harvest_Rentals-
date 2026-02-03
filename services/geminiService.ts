
import { GoogleGenAI } from "@google/genai";

// Fix: Use process.env.API_KEY directly and follow standard initialization
export const generateRedAlertMessage = async (tenantName: string, balance: number, daysLate: number) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a firm "Red Alert" SMS for RentApp (Nepal). Tenant: ${tenantName}, Balance: Rs. ${balance}, Status: ${daysLate > 0 ? 'Payment overdue' : 'Low balance'}. Tone: Professional, IoT-driven, firm. Max 140 chars. Include 'RentApp'.`,
  });
  
  return response.text || "Message generation failed.";
};

export const suggestSystemReport = async (buildingId: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize the operational health of building ${buildingId} based on an offline-first smart sub-metering architectural model using the RentApp platform. Focus on 'Quiet Mode' operations.`,
  });

  return response.text || "Summary failed.";
};
