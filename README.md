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

## 📡 API Endpoints

### 1. Health Check
Checks if the service is operational.
- **URL:** `[https://queuestorm-investigator-ekyi.onrender.com/health](https://queuestorm-investigator-ekyi.onrender.com/health)`
- **Method:** `GET`
- **Response:** `{"status": "ok"}`

### 2. Analyze Ticket
The core service endpoint that analyzes customer complaints using transaction data.
- **URL:** `[https://queuestorm-investigator-ekyi.onrender.com/analyze-ticket](https://queuestorm-investigator-ekyi.onrender.com/analyze-ticket)`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body Example:**
```json
{
  "ticket_id": "TKT-001",
  "complaint": "I sent 5000 taka to a wrong number...",
  "transaction_history": [
    {
      "transaction_id": "TXN-9101",
      "timestamp": "2026-04-14T14:08:22Z",
      "type": "transfer",
      "amount": 5000,
      "counterparty": "+8801719876543",
      "status": "completed"
    }
  ]
}