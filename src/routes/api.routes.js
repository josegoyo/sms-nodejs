const { Router } = require('express');
const router = Router();
const { postMessage, receiveMessage } = require('../controllers/index.controller');

router.post('/send-sms', postMessage);
router.post('/receive-sms', receiveMessage);

module.exports = router;