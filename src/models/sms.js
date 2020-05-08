const { Schema, model } = require('mongoose');

const smsSchema = new Schema({
    body: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    type: { type: String }
}, { timestamps: true });

module.exports = model('sms', smsSchema);