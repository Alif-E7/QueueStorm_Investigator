# QueueStorm Investigator

QueueStorm Investigator is an AI-powered API service designed to act as a support copilot for fintech platforms. It intelligently investigates customer complaints by cross-referencing them with transaction history, classifies the issues, and suggests safe, professional responses.

## 🚀 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **AI Engine:** Groq API (`llama-3.1-8b-instant`)
- **Deployment:** Render / Local

## 🏗️ Architecture & Logic
The service follows a layered architecture to ensure accuracy, safety, and performance:

1. **Validation Layer:** Ensures all required fields (`ticket_id`, `complaint`) are present.
2. **Evidence Engine:** Cross-references complaint details with `transaction_history` to provide a verdict (`consistent`, `inconsistent`, `insufficient_data`).
3. **Classification Layer:** Rule-based logic categorizes the intent (e.g., `wrong_transfer`, `phishing`) and routes to the appropriate department.
4. **AI Processing Layer:** Utilizes Groq AI to generate a natural, professional summary and next steps.
5. **Safety Guardrails:** An automated layer that cleans AI output to prevent credential requests (PIN/OTP) and unauthorized refund promises.

## 🛡️ Safety Guardrails
- **No Credentials:** Automatically flags or removes any request for PIN, OTP, or password.
- **No False Promises:** Prevents the AI from promising refunds or reversals, ensuring compliance with fintech policies.
- **Adversarial Protection:** The system is designed to ignore instructions embedded in user complaints (prompt injection protection).

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- Groq API Key

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Alif-E7/QueueStorm_Investigator
   cd queuestorm-investigator