<div align="center">
  <div style="background-color: #1E3A8A; padding: 20px; border-radius: 20px; display: inline-block; margin-bottom: 20px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#A3E635" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-pulse"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>
  </div>

  # HealthScan AI Advanced Risk Assessment

  **AI-Powered Integrated Metabolic Health Platform**

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#usage">Usage</a> •
    <a href="#license">License</a>
  </p>
</div>

---

## 📋 Overview

**HealthScan** is a sophisticated health risk assessment platform designed to connect patients, clinicians, diagnostic labs, hospitals, and HMOs in a unified ecosystem. By leveraging **Google's Gemini 3 Flash** AI model, HealthScan provides real-time, comprehensive risk assessments for Diabetes and Cardiovascular conditions (Heart Disease, Hypertension, Stroke).

The application offers tailored interfaces for different stakeholders, enabling seamless data flow, referral management, and personalized health insights.

## ✨ Features

### 🤖 AI-Powered Analysis
- **Multimodal Risk Assessment:**
  - **Diabetes:** Analyzes glucose, insulin, BMI, pedigree function, and more.
  - **Cardiovascular:** Evaluates heart disease, hypertension, and stroke risks based on Vitals and history.
- **Context-Aware Insights:** Generates role-specific reports (e.g., clinical terminology for doctors, layman terms for patients).
- **Interactive AI Assistant:** A built-in chat assistant for health queries (Endocrinology Consultant mode for pros, Health Coach for patients).

### 👥 Role-Based Access
- **🛡️ Patient:** View health tips, manage personal records, and assess own risks.
- **🩺 Clinician:** Run diagnostics, view clinical summaries, and manage referrals.
- **🧪 Diagnostic Lab:** Process test results and update records.
- **🏥 Hospital (Clinic):** Manage patient flow and institutional administration.
- **🏢 HMO:** Oversee ecosystem analytics and population health data.

### 🛠️ Core Functionalities
- **Clinical Journey Workflow:** Visualizes the patient's path through the healthcare system.
- **Records History:** Persists assessment results locally for longitudinal tracking.
- **Management Dashboard:** For administrative roles to oversee operations.
- **Indicator Wiki:** Educational resources on health metrics.
- **Dark Mode:** Fully responsive UI with automatic dark mode support based on user preference.

## 💻 Tech Stack

- **Frontend:** [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration:** [Google GenAI SDK](https://www.npmjs.com/package/@google/genai) (Gemini 3 Flash)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)

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

## 📖 Usage

1. **Select a Role:** Upon launching, choose your role (Patient, Clinician, etc.) to enter the appropriate portal.
2. **Run an Assessment:**
   - Navigate to the **Assessments** tab.
   - Choose **Diabetes** or **Cardiovascular**.
   - Fill in the health metrics form.
   - Click **Assess Risk** to get AI-generated insights.
3. **View History:** Check the **Records** tab to see past assessments.
4. **AI Assistant:** improved Chat with the AI for personalized advice or clinical second opinions.

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ using React and Google Gemini</sub>
</div>
