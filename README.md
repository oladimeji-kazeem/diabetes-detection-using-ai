<div align="center">
  <div style="background-color: #1E3A8A; padding: 20px; border-radius: 20px; display: inline-block; margin-bottom: 20px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#A3E635" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-pulse"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>
  </div>

  # HealthScan AI Advanced Risk Assessment

  **AI-Powered Integrated Metabolic Health Platform**

  <p align="center">
    <a href="#about-the-project">About</a> •
    <a href="#key-features">Features</a> •
    <a href="#stakeholders--perspectives">Stakeholders</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#license">License</a>
  </p>
</div>

---

## 📋 About The Project

**HealthScan** is a sophisticated health risk assessment platform designed to connect patients, clinicians, diagnostic labs, hospitals, and HMOs in a unified ecosystem. By leveraging **Google's Gemini 3 Flash** AI model, HealthScan provides real-time, multimodal risk assessments for Diabetes and Cardiovascular conditions (Heart Disease, Hypertension, Stroke).

The application offers tailored interfaces for different stakeholders, enabling seamless data flow, referral management, and actionable personalized health insights.

### 🌟 Benefits

-   **Holistic Patient View**: Integrates data from multiple sources (vitals, history, labs) for a complete health picture.
-   **Early Detection**: Proactive identification of risk factors using advanced AI models before conditions become critical.
-   **Workflow Efficiency**: Streamlines the referral process between clinics, labs, and specialists, reducing administrative overhead.
-   **Patient Empowerment**: Provides accessible, easy-to-understand health insights and actionable advice, fostering better self-care.
-   **Scalability**: Designed to support growing patient populations and diverse healthcare settings, from small clinics to large HMOs.

### 💡 Use Cases

-   **Preventative Care Screening**: Rapid risk assessment for large populations during community health drives.
-   **Chronic Disease Management**: Ongoing monitoring and trend analysis for diabetic and hypertensive patients.
-   **Remote Patient Monitoring**: Patients self-reporting vitals for clinician review and intervention.
-   **Clinical Decision Support**: AI-assisted second opinions for complex cases to aid diagnostic accuracy.
-   **Health Insurance Analytics**: Population health risk stratification for HMOs to optimize resource allocation.

---

## ✨ Key Features

### 🤖 AI-Powered Analysis
- **Multimodal Risk Assessment:**
  - **Diabetes:** Analyzes glucose, insulin, BMI, pedigree function, and more.
  - **Cardiovascular:** Evaluates heart disease, hypertension, and stroke risks based on vital signs and medical history.
- **Context-Aware Insights:** Generates role-specific reports (e.g., detailed clinical terminology for doctors, simple actionable advice for patients).
- **Interactive AI Assistant:** A built-in chat assistant for health queries, operating in different modes (Endocrinology Consultant for pros, Health Coach for patients).

### 👥 Role-Based Access
- **🛡️ Patient Portal:** View health tips, manage personal records, and assess own risks.
- **🩺 Clinician Dashboard:** Run diagnostics, view clinical summaries, and manage referrals.
- **🧪 Diagnostic Lab Interface:** Process test requests and upload results directly to patient records.
- **🏥 Hospital Administration:** Manage patient flow and institutional operations.
- **🏢 HMO Analytics:** Oversee ecosystem analytics and population health data.

### 🛠️ Core Functionalities
- **Clinical Journey Workflow:** Visualizes the patient's path through the healthcare system.
- **Records History:** Persists assessment results locally for longitudinal tracking.
- **Indicator Wiki:** Educational resources on health metrics to improve health literacy.
- **Dark Mode:** Fully responsive UI with automatic dark mode support based on user preference.

---

## 👥 Stakeholders & Perspectives

| Stakeholder | Perspective | Key Needs Solved |
| :--- | :--- | :--- |
| **Patients** | *"I want to understand my health risks and get actionable advice without medical jargon."* | Self-assessment tools, clear AI explanations, personalized health tips. |
| **Clinicians** | *"I need efficient tools to screen patients and manage referrals quickly."* | Clinical dashboards, streamlined lab referrals, detailed risk reports. |
| **Diagnostic Labs** | *"We need clear test requests and a simple way to report results back to doctors."* | Digital test requests, result upload portal, seamless integration. |
| **Hospitals** | *"We need to oversee patient flow and ensure institutional efficiency."* | Administrative dashboards, patient management tools, operational insights. |
| **HMOs** | *"We need aggregate data to manage population health risk and costs."* | Analytics dashboards, risk stratification reports, population health trends. |

---

## 💻 Tech Stack

- **Frontend:** [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration:** [Google GenAI SDK](https://www.npmjs.com/package/@google/genai) (Gemini 3 Flash)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)

---

## 📂 Project Structure

```
healthscan/
├── components/          # React components
│   ├── Cardiovascular/  # Heart, Hypertension, Stroke modules
│   ├── ...              # Shared components (Header, Forms, etc.)
├── services/            # API services
│   └── geminiService.ts # Google Gemini AI integration logic
├── App.tsx              # Main application entry and routing
├── types.ts             # TypeScript interfaces and types
└── ...
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- A **Google Gemini API Key** (Get one at [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/healthscan.git
   cd healthscan
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your API Key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000` (or the port shown in your terminal).

---

## 📖 Usage Guide

1. **Select a Role:** Upon launching, choose your role (Patient, Clinician, etc.) to enter the appropriate portal.
2. **Run an Assessment:**
   - Navigate to the **Assessments** tab.
   - Choose **Diabetes** or **Cardiovascular**.
   - Fill in the health metrics form.
   - Click **Assess Risk** to get AI-generated insights.
3. **View History:** Check the **Records** tab to see past assessments.
4. **AI Assistant:** Chat with the AI for personalized advice or clinical second opinions.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ using React and Google Gemini</sub>
</div>
