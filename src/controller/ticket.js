const { analyzeEvidence } = require('../services/evidence');
const { classifyTicket } = require('../services/classifier');
const { generateAiText } = require('../services/aiworker');
const { applySafetyGuardrails } = require('../utils/safety');

const analyze = async (req, res) => {
    try {
        const { ticket_id, complaint, transaction_history } = req.body;

        // Step 1: Evidence Matching (Layer 2)
        const evidence = analyzeEvidence(complaint, transaction_history);

        // Step 2: Classification (Layer 3)
        const classification = classifyTicket(complaint);

        // Step 3: AI Text Generation (Layer 4)
        const aiResponse = await generateAiText(complaint, classification, evidence);

        // Step 4: Apply strict safety guardrails (Layer 5)
        const safeCustomerReply = applySafetyGuardrails(aiResponse.customer_reply);

        // Step 5: Assemble final response matching the exact schema
        const finalResponse = {
            ticket_id: ticket_id,
            relevant_transaction_id: evidence.relevant_transaction_id,
            evidence_verdict: evidence.evidence_verdict,
            case_type: classification.case_type,
            severity: classification.severity,
            department: classification.department,
            agent_summary: aiResponse.agent_summary,
            recommended_next_action: aiResponse.recommended_next_action,
            customer_reply: safeCustomerReply,
            human_review_required: classification.human_review_required,
            confidence: 0.9
        };

        return res.status(200).json(finalResponse);

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({
            error: "Internal server error during analysis."
        });
    }
};

module.exports = { analyze };