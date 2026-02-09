
export type UserRole = 'individual' | 'professional' | 'clinic';

export interface HealthData {
  patientName?: string;
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigree: number;
  age: number;
}

export interface RiskAssessment {
  prediction: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  probability: number;
  keyFactors: string[];
  recommendations: string[];
  explanation: string;
  clinicalNote?: string;
}

export interface AssessmentRecord {
  id: string;
  timestamp: number;
  role: UserRole;
  data: HealthData;
  result: RiskAssessment;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface IndicatorInfo {
  id: string;
  label: string;
  unit: string;
  range: string;
  description: string;
  whyItMatters: string;
  icon: string;
}
