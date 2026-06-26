const groq = require('../config/groq');
const { generateSystemPrompt } = require('../utils/prompt');

const generateAiText = async (complaint, classification, evidence) => {
    const prompt = `Complaint: "${complaint}"\nVerdict: ${evidence.evidence_verdict}\nClassification: ${classification.case_type}`;
    
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: generateSystemPrompt() },
                { role: "user", content: prompt }
            ],
            model: "llama3-8b-8192", // Fast model for JSON response
            temperature: 0.2,
            response_format: { type: "json_object" }
        });

        return JSON.parse(chatCompletion.choices[0].message.content);
    } catch (error) {
        console.error("Groq AI Error:", error);
        // Fallback jeno API crash na kore
        return {
            agent_summary: "Customer issue requires manual review.",
            recommended_next_action: "Review case manually due to system timeout.",
            customer_reply: "We have received your request. Please do not share your PIN or OTP with anyone. Our support team will contact you soon."
        };
    }
};

module.exports = { generateAiText };