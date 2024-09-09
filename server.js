const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Replace with your Twilio credentials
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(twilioAccountSid, twilioAuthToken);


app.post('/submit', (req, res) => {
    const { name, mobile } = req.body;

    // Send SMS
    client.messages.create({
        body: `New form submission: Name: ${name}, Mobile: ${mobile}`,
        to: '+919441901301', // Recipient phone number
        from: '+17274982507', // Your Twilio phone number
    })
    .then((message) => console.log('SMS sent: ' + message.sid))
    .catch((error) => res.status(500).send('Error sending SMS'));

    // Optionally, send WhatsApp message using Twilio's WhatsApp API

    res.send('Form submitted successfully');
});

const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
