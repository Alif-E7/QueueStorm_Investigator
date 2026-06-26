const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticket');
const validateTicket = require('../middlewares/validator');

router.get('/health', (req, res) => {
    res.status(200).json({ status: "ok" });
});

router.post('/analyze-ticket', validateTicket, ticketController.analyze);

module.exports = router;