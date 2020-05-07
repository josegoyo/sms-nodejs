const { Router } = require('express');
const router = Router();
const SMS = require('./../models/sms');

router.get('/', async (req, res) => {

    const messages = await SMS.find({}).lean();
    res.render('index', { messages });

});

module.exports = router;