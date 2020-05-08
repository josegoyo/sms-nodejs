const MessagingResponse = require('twilio').twiml.MessagingResponse;
const SMS = require('../models/sms');
const { sendMessage } = require('../twilio/send-sms');
const config = require('../config.js');
const { getSocket } = require('../sockets');

const indexController = async (req, res) => {
    const messages = await SMS.find({}).sort('-createdAt').lean();
    res.render('index', { messages });
};

const postMessage = async (req, res) => {

    const { message, phone } = req.body;
    // simple validation : 
    if (!message || !phone) return res.json('missing message or phone');

    const result = await sendMessage(message, phone);
    await SMS.create({
        body: message,
        from: config.phone_test_twilio,
        to: phone,
        type: 'sended'
    });

    res.redirect('/')
};

const receiveMessage = async (req, res) => {
    console.log(req.body.Body);

    const savesms = await SMS.create({
        body: req.body.Body,
        from: req.body.From,
        to: req.body.To,
        type: 'received'
    });

    getSocket().emit('new message', savesms);

    const twiml = new MessagingResponse();
    //twiml.message('Your message was received');

    res.send(twiml.toString());
}

module.exports = {
    indexController,
    postMessage,
    receiveMessage
}