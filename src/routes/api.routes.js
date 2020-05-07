const { Router } = require('express');
const router = Router();
const { sendMessage } = require('../twilio/send-sms');

router.post('/send-sms', async (req, res) => {
    console.log(req.body)
    const response = await sendMessage(req.body.message, req.body.phone);
    res.send(`recibido id ${response}`)
});

module.exports = router;