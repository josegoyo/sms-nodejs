const config = require('../config');
const client = require('twilio')(config.accountSid, config.authToken);

/**
 * 
 * @param {string} body - message you want send
 * @param {string} phone - phone number destin
 */

const sendMessage = async (body, phone) => {

    try {
        const message = await client.messages.create({
            to: phone,
            from: config.phone_test_twilio,
            body
        });
        return message.sid
    } catch (error) {
        console.log(error)
    }

}
module.exports = { sendMessage };