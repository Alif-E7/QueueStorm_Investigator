const analyzeEvidence = (complaint, history) => {
    if (!history || history.length === 0) {
        return { relevant_transaction_id: null, evidence_verdict: "insufficient_data" };
    }

    const amountMatches = complaint.match(/\d+/g);
    
    if (amountMatches) {
        const sortedHistory = [...history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        for (let num of amountMatches) {
            const amount = parseInt(num);
            
            const matchedTxn = sortedHistory.find(txn => txn.amount === amount);
            
            if (matchedTxn) {
                const priorTxns = history.filter(t => t.counterparty === matchedTxn.counterparty);
                if (priorTxns.length > 1 && complaint.toLowerCase().includes("wrong")) {
                    return { relevant_transaction_id: matchedTxn.transaction_id, evidence_verdict: "inconsistent" };
                }
                return { relevant_transaction_id: matchedTxn.transaction_id, evidence_verdict: "consistent" };
            }
        }
    }

    return { relevant_transaction_id: null, evidence_verdict: "insufficient_data" };
};

module.exports = { analyzeEvidence };