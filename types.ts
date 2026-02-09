
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

export interface HeartData {
  patientName?: string;
  age: number;
  sex: 'male' | 'female';
  cp: number; // Chest Pain Type
  trestbps: number; // Resting Blood Pressure
  chol: number; // Serum Cholestoral
  fbs: number; // Fasting Blood Sugar > 120 mg/dl
  restecg: number; // Resting Electrocardiographic results
  thalach: number; // Maximum Heart Rate Achieved
  exang: number; // Exercise Induced Angina
  oldpeak: number; // ST depression induced by exercise
  slope: number; // Slope of the peak exercise ST segment
  ca: number; // Number of major vessels (0-3) colored by flourosopy
  thal: number; // 3 = normal; 6 = fixed defect; 7 = reversable defect
  status?: ClinicalStatus;
  referrals?: LabTestRequest[];
  prescriptions?: Prescription[];
}

export interface HypertensionData {
  patientName?: string;
  age: number;
  sex: 'male' | 'female';
  bmi: number;
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  smoking: 'yes' | 'no';
  alcohol: 'yes' | 'no';
  activity: 'sedentary' | 'moderate' | 'active';
  familyHistory: 'yes' | 'no';
  saltIntake: 'low' | 'moderate' | 'high';
  status?: ClinicalStatus;
  referrals?: LabTestRequest[];
  prescriptions?: Prescription[];
}

export interface StrokeData {
  patientName?: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  hypertension: boolean;
  heartDisease: boolean;
  everMarried: boolean;
  workType: 'private' | 'self-employed' | 'govt_job' | 'children' | 'never_worked';
  residenceType: 'urban' | 'rural';
  avgGlucoseLevel: number;
  bmi: number;
  smokingStatus: 'formerly smoked' | 'never smoked' | 'smokes' | 'unknown';
  status?: ClinicalStatus;
  referrals?: LabTestRequest[];
  prescriptions?: Prescription[];
}

export type AssessmentType = 'diabetes' | 'heart' | 'hypertension' | 'stroke';

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
  type: AssessmentType;
  data: HealthData | HeartData | HypertensionData | StrokeData;
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
