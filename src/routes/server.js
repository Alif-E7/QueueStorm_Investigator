const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticket');
const validateTicket = require('../middlewares/validator');

// Health Check Endpoint (60 সেকেন্ড রুল)
router.get('/health', (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Main Endpoint
router.post('/analyze-ticket', validateTicket, ticketController.analyze);

module.exports = router;