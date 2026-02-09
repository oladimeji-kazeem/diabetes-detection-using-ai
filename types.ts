
export type UserRole = 'individual' | 'professional' | 'clinic' | 'hmo' | 'lab';

export interface UserProfile {
  name: string;
  email: string;
  institution?: string;
  specialty?: string;
  preferredPharmacyLocation?: string;
  preferences: {
    darkMode: boolean;
    notifications: boolean;
    unitSystem: 'metric' | 'imperial';
  };
}

export type ClinicalStatus = 'healthy' | 'referral_sent' | 'test_scheduled' | 'results_updated' | 'consultation_booked' | 'prescribed';

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  pharmacyName: string;
  pharmacyLocation: string;
  timestamp: number;
}

export interface LabTestRequest {
  id: string;
  testType: string;
  requestingDoctor: string;
  status: 'pending' | 'scheduled' | 'completed';
  scheduledDate?: number;
  results?: Partial<HealthData>;
}

export interface HealthData {
  patientName?: string;
  patientId?: string;
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigree: number;
  age: number;
  status?: ClinicalStatus;
  referrals?: LabTestRequest[];
  prescriptions?: Prescription[];
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
  timestamp: number;
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
