const applySafetyGuardrails = (replyText) => {
    let safeText = replyText;

    // Rule 1: No refund promises
    const refundRegex = /we will refund you|your money will be refunded|reversing it now/gi;
    if (refundRegex.test(safeText)) {
        safeText = safeText.replace(refundRegex, "any eligible amount will be returned through official channels");
    }

    // Rule 2: Ensure PIN/OTP warning exists
    if (!safeText.toLowerCase().includes("pin") && !safeText.toLowerCase().includes("otp")) {
        safeText += " Please do not share your PIN or OTP with anyone.";
    }

    return safeText;
};

module.exports = { applySafetyGuardrails };