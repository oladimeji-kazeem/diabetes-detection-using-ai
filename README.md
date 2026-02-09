
# GlucoScan AI - Advanced Diabetes Risk Assessment

GlucoScan AI is a state-of-the-art health monitoring application designed to assess the risk of diabetes using advanced Artificial Intelligence. Powered by Google's Gemini 3 Flash model, it provides personalized metabolic health insights for individuals, medical professionals, and clinical institutions.

## 🚀 Key Features

*   **Role-Based Access Control**: Tailored interfaces for three distinct user types:
    *   **Personal Care**: Focused on lifestyle coaching and personal trend tracking.
    *   **Clinical Professional**: Diagnostic tools and technical summaries for doctors and nurses.
    *   **Health Center**: Enterprise-grade management for patient populations.
*   **AI-Powered Risk Analysis**: Utilizes the Gemini 3 Flash model to analyze physiological metrics (Glucose, BMI, Insulin, etc.) and pedigree history to predict diabetes risk with high accuracy.
*   **Interactive AI Assistant**: A context-aware chat assistant that acts as a Health Coach for individuals or a Clinical Consultant for medical staff.
*   **Local History Tracking**: Securely stores assessment records locally in the browser, ensuring user privacy and data persistence across sessions.
*   **Educational Clinical Wiki**: A built-in reference guide explaining key medical indicators like Glucose, BMI, and Insulin levels.

## 👥 Target Audience & Stakeholders

*   **Individuals**: People looking to proactively monitor their metabolic health and receive personalized lifestyle advice.
*   **Healthcare Professionals**: Endocrinologists, General Practitioners, and Nurses requiring quick, AI-assisted risk screenings.
*   **Medical Clinics & Hospitals**: Institutions needing efficient patient triage and risk management tools.

## 💡 Use Cases

1.  **Self-Screening**: Individuals can perform quick home assessments to check their risk levels before consulting a doctor.
2.  **Clinical Triage**: Nurses can use the app to screen patients during intake, prioritizing high-risk cases for immediate medical attention.
3.  **Long-Term Monitoring**: Patients with pre-diabetes can track their metrics over time to see how lifestyle changes affect their risk profile.
4.  **Medical Education**: Implementing the "Clinical Wiki" and AI chat to educate patients on the importance of each health metric.

## 🌟 Benefits

*   **Early Detection**: Identifies potential diabetes risks before they develop into severe conditions.
*   **Accessible AI**: Democratizes access to advanced medical analysis, making it understandable for non-experts.
*   **Data Privacy**: Designed with a "Local First" approach; assessments are processed via API but history is stored locally on the user's device.
*   **Scalability**: The architecture supports everything from a single user on a mobile device to a busy clinic workstation.

## 🛠️ Implementation Options

This application allows for flexible deployment strategies to meet various privacy and accessibility needs:

*   **Cloud Deployment**: Deploy on platforms like Vercel or Netlify for global accessibility, ideal for public health campaigns.
*   **Local Clinic Server**: run on a secure local network (intranet) within a clinic to ensure patient data never leaves the facility's control (subject to API usage).
*   **Hybrid Model**: Use a cloud-based frontend for accessibility while keeping a separate, secure backend for patient record storage.

## 💻 Tech Stack

*   **Frontend**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **AI Integration**: [Google Gemini SDK](https://ai.google.dev/) (`@google/genai`)
*   **Visualization**: [Recharts](https://recharts.org/)

## 🏁 Getting Started

### Prerequisites

*   **Node.js**: Version 18 or higher.
*   **Gemini API Key**: You need a valid API key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/oladimeji-kazeem/diabetes-detection-using-ai.git
    cd diabetes-detection-using-ai
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Configuration

1.  Create a `.env` file in the root directory (or rename `.env.example` if available).
2.  Add your Google Gemini API key:
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` (or the port shown in your terminal).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate the static files in the `dist` directory.

## 📂 Project Structure

```text
src/
├── components/       # UI Components (Header, Assessment, ResultDisplay, etc.)
├── services/        # API integrations (geminiService.ts)
├── App.tsx          # Main application logic and routing
├── types.ts         # TypeScript interfaces and types
├── index.css        # Global styles and Tailwind directives
└── main.tsx         # Application entry point
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
