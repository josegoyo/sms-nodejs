const { Schema, model } = require('mongoose');

const smsSchema = new Schema({
    body: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    sid: { type: String, required: true }
}, { timestamps: true });

module.exports = model('sms', smsSchema);