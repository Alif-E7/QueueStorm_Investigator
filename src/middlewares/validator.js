const validateTicket = (req, res, next) => {
    const { ticket_id, complaint } = req.body;

    if (!ticket_id || !complaint) {
        return res.status(400).json({
            error: "Malformed input: ticket_id and complaint are required."
        });
    }
    next();
};

module.exports = validateTicket;