
import { GoogleGenAI, Type } from "@google/genai";
import { HealthData, RiskAssessment, UserRole } from "../types";

// The API key is obtained directly from process.env.API_KEY as per guidelines.

export class GeminiService {
  /**
   * Analyzes health metrics for diabetes risk using Gemini 3 Flash.
   */
  async analyzeRisk(data: HealthData, role: UserRole): Promise<RiskAssessment> {
    // Create a new instance right before the API call for text tasks.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const context = role === 'professional' || role === 'clinic' 
      ? "Provide a clinical summary suitable for medical personnel, including ICD-10 considerations if applicable." 
      : "Provide an easy-to-understand explanation for a layperson, focusing on lifestyle changes.";

    const prompt = `Analyze the following patient health metrics for diabetes risk:
    - Patient Name: ${data.patientName || 'Anonymous'}
    - Pregnancies: ${data.pregnancies}
    - Glucose: ${data.glucose} mg/dL (2hr plasma)
    - Blood Pressure: ${data.bloodPressure} mmHg (Diastolic)
    - Skin Thickness: ${data.skinThickness} mm (Triceps)
    - Insulin: ${data.insulin} mU/L (2-hr serum)
    - BMI: ${data.bmi}
    - Diabetes Pedigree: ${data.diabetesPedigree} (Genetic Factor)
    - Age: ${data.age}
    
    Role Context: ${context}
    
    Provide a comprehensive risk assessment in JSON format.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prediction: { type: Type.STRING },
            probability: { type: Type.NUMBER },
            keyFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            explanation: { type: Type.STRING },
            clinicalNote: { type: Type.STRING, description: "Additional notes for medical staff" },
          },
          required: ["prediction", "probability", "keyFactors", "recommendations", "explanation"],
        },
      },
    });

    // Directly access response.text property (getter)
    return JSON.parse(response.text.trim());
  }

  /**
   * Fetches a chat response using Gemini 3 Flash.
   */
  async getChatResponse(history: { role: 'user' | 'model', text: string }[], message: string, role: UserRole) {
    // Create a new instance right before the API call.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = role === 'professional' 
      ? 'You are a Clinical Endocrinology Consultant AI. Provide high-level medical insights, cite studies where relevant, and use technical terminology for medical professionals.'
      : 'You are a friendly Health Coach AI. Explain things simply, focus on diet and exercise, and encourage the user to stay positive.';

    // Mapping history to correctly formatted parts for the chat session
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: { systemInstruction },
      history: chatHistory,
    });

    const result = await chat.sendMessage({ message });
    // Directly access result.text property
    return result.text;
  }
}

export const geminiService = new GeminiService();
