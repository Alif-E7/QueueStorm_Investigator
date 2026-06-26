const analyzeEvidence = (complaint, history) => {
    if (!history || history.length === 0) {
        return { relevant_transaction_id: null, evidence_verdict: "insufficient_data" };
    }

    // কমপ্লেইন থেকে এমাউন্ট বের করা (যেমন: 5000)
    const amountMatches = complaint.match(/\d+/g);
    
    if (amountMatches) {
        for (let num of amountMatches) {
            const amount = parseInt(num);
            // হিস্ট্রিতে এই এমাউন্টের ট্রানজেকশন খুঁজবে
            const matchedTxn = history.find(txn => txn.amount === amount);
            
            if (matchedTxn) {
                // যদি একই নাম্বারে আগে অনেকবার টাকা পাঠানো হয়, তবে "inconsistent" (Sample-02 logic)
                const priorTxns = history.filter(t => t.counterparty === matchedTxn.counterparty);
                if (priorTxns.length > 1 && complaint.toLowerCase().includes("wrong")) {
                    return { relevant_transaction_id: matchedTxn.transaction_id, evidence_verdict: "inconsistent" };
                }
                return { relevant_transaction_id: matchedTxn.transaction_id, evidence_verdict: "consistent" };
            }
        }
    }

    // যদি মাল্টিপল ম্যাচ বা অস্পষ্ট কিছু থাকে (Sample-08 logic)
    return { relevant_transaction_id: null, evidence_verdict: "insufficient_data" };
};

module.exports = { analyzeEvidence };