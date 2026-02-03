
# Rentapp Smart Platform

A premium, IoT-driven property management system designed for sustainable and simplified residential management. Inspired by the clean aesthetics of modern hospitality platforms, Rentapp provides property owners with granular control over utilities and resident lifecycle.

## 🚀 Key Features

- **The Pulse (Dashboard)**: Real-time building health monitoring with aggregated load patterns and KPI tracking.
- **Smart Unit Management**: Granular control over 22+ sub-meters with automatic safety limit enforcement.
- **Eco-Smart Utility Logic**: Deterministic billing and automatic curtailment based on real-time consumption.
- **AI-Powered Communication**: Integrated Gemini AI to compose professional "Red Alert" messages for balance reminders and maintenance updates.
- **Secure Gateway**: Property-specific authentication for administrative access (Demo: `admin` / `admin`).

## 🛠 Tech Stack

- **Frontend**: React 19 (ESM)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Visualizations**: Recharts
- **Intelligence**: Google Gemini API (@google/genai)
- **Typography**: Plus Jakarta Sans

## 🏗 Project Structure

- `/pages`: Modular UI for Dashboard, Residents, Units, and Communication.
- `/services`: Mock data layer and Gemini API integrations.
- `/components`: Reusable UI Layouts and brand assets.

## 📖 Setup Instructions

1. Ensure `process.env.API_KEY` is configured with your Google Gemini API key.
2. Serve the `index.html` using a modern development server.
3. Access the demo property **KunwarNiwas** using the credentials:
   - **Property ID**: `admin`
   - **Password**: `admin`

## 📞 Support

For property-specific support for **KunwarNiwas**, contact the owner at `984164243`.

---
*Rentapp © 2026 • Premium Rental & Utility Management*
