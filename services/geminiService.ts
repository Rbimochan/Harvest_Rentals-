
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

export const generateRedAlertMessage = async (tenantName: string, balance: number, daysOverdue: number) => {
  if (!apiKey) return `URGENT: ${tenantName}, your rent balance of $${balance} is ${daysOverdue} days overdue. Please contact the management immediately.`;
  
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a professional but firm "Red Alert" rent overdue notification for a tenant named ${tenantName} who is $${balance} behind and ${daysOverdue} days late. Keep it under 160 characters for SMS.`,
  });
  
  return response.text || "Message generation failed.";
};

export const suggestCommunicationTemplate = async (category: string) => {
  if (!apiKey) return "Hello, this is a reminder regarding your rental agreement.";

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest a friendly email template for ${category} in a rental management context. Keep it concise.`,
  });

  return response.text || "Suggestion failed.";
};
