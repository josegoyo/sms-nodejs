const { Router } = require('express');
const router = Router();
const { sendMessage } = require('../twilio/send-sms');
const SMS = require('./../models/sms');
const config = require('../config.js')

router.post('/send-sms', async (req, res) => {

    const { message, phone } = req.body;
    // simple validation : 
    if (!message || !phone) return res.json('missing message or phone');

    const result = await sendMessage(message, phone);
    await SMS.create({
        body: message,
        from: config.phone_test_twilio,
        to: phone,
        sid: result.sid
    });

    res.redirect('/')
});

module.exports = router;