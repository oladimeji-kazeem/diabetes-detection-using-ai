
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

  async analyzeHeartRisk(data: any, role: UserRole): Promise<RiskAssessment> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const context = role === 'professional' || role === 'clinic'
      ? "Provide a clinical summary suitable for medical personnel, including potential cardiological interventions."
      : "Explain the risk factors simply, focusing on diet, exercise, and stress management.";

    const prompt = `Analyze the following patient health metrics for Heart Disease risk:
    - Age: ${data.age}
    - Sex: ${data.sex}
    - Chest Pain Type (cp): ${data.cp}
    - Resting BP (trestbps): ${data.trestbps} mm Hg
    - Cholesterol (chol): ${data.chol} mg/dl
    - Fasting Blood Sugar > 120 mg/dl (fbs): ${data.fbs ? 'Yes' : 'No'}
    - Resting ECG (restecg): ${data.restecg}
    - Max Heart Rate (thalach): ${data.thalach}
    - Exercise Induced Angina (exang): ${data.exang ? 'Yes' : 'No'}
    - ST Depression (oldpeak): ${data.oldpeak}
    - Slope: ${data.slope}
    - Major Vessels (ca): ${data.ca}
    - Thalassemia (thal): ${data.thal}
    
    Role Context: ${context}
    
    Provide a comprehensive risk assessment in JSON format with fields: prediction (Low/Moderate/High Risk), probability (0-1), keyFactors (array), recommendations (array), explanation, and clinicalNote.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text.trim());
  }

  async analyzeHypertensionRisk(data: any, role: UserRole): Promise<RiskAssessment> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const context = role === 'professional' ? "Clinical focus on vascular resistance and potential end-organ damage." : "Lifestyle focus on sodium intake and activity.";

    const prompt = `Analyze for Hypertension Risk:
    - Age: ${data.age}
    - Sex: ${data.sex}
    - BMI: ${data.bmi}
    - BP: ${data.systolicBP}/${data.diastolicBP} mmHg
    - Heart Rate: ${data.heartRate} bpm
    - Smoking: ${data.smoking}
    - Alcohol: ${data.alcohol}
    - Activity Level: ${data.activity}
    - Family History: ${data.familyHistory}
    - Salt Intake: ${data.saltIntake}

    Role Context: ${context}
    
    Provide a JSON risk assessment (prediction, probability, keyFactors, recommendations, explanation).`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text.trim());
  }

  async analyzeStrokeRisk(data: any, role: UserRole): Promise<RiskAssessment> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const context = role === 'professional' ? "Neurological focus on ischemic/hemorrhagic risk factors." : "Focus on FAST warning signs and lifestyle.";

    const prompt = `Analyze for Stroke Risk:
    - Age: ${data.age}
    - Gender: ${data.gender}
    - Hypertension History: ${data.hypertension ? 'Yes' : 'No'}
    - Heart Disease History: ${data.heartDisease ? 'Yes' : 'No'}
    - Ever Married: ${data.everMarried ? 'Yes' : 'No'}
    - Work Type: ${data.workType}
    - Residence: ${data.residenceType}
    - Avg Glucose: ${data.avgGlucoseLevel}
    - BMI: ${data.bmi}
    - Smoking Status: ${data.smokingStatus}

    Role Context: ${context}
    
    Provide a JSON risk assessment (prediction, probability, keyFactors, recommendations, explanation).`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
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
