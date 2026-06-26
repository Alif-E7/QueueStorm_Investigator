const classifyTicket = (complaint) => {
    const text = complaint.toLowerCase();
    
    if (text.includes("otp") || text.includes("pin") || text.includes("password")) {
        return { case_type: "phishing_or_social_engineering", department: "fraud_risk", severity: "critical", human_review_required: true };
    }
    if (text.includes("wrong number") || text.includes("mistake") || text.includes("wrong person")) {
        return { case_type: "wrong_transfer", department: "dispute_resolution", severity: "high", human_review_required: true };
    }
    if (text.includes("failed") || text.includes("deducted")) {
        return { case_type: "payment_failed", department: "payments_ops", severity: "high", human_review_required: false };
    }
    
    if (text.includes("twice") || text.includes("double")) {
        return { case_type: "duplicate_payment", department: "payments_ops", severity: "high", human_review_required: true };
    }
    if (text.includes("refund") || text.includes("changed my mind")) {
        return { case_type: "refund_request", department: "customer_support", severity: "low", human_review_required: false };
    }
    if (text.includes("merchant") || text.includes("settlement")) {
        return { case_type: "merchant_settlement_delay", department: "merchant_operations", severity: "medium", human_review_required: false };
    }
    if (text.includes("agent") || text.includes("cash in") || text.includes("এজেন্ট")) {
        return { case_type: "agent_cash_in_issue", department: "agent_operations", severity: "high", human_review_required: true };
    }

    return { case_type: "other", department: "customer_support", severity: "low", human_review_required: false };
};

module.exports = { classifyTicket };