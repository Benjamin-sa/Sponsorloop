const express = require('express');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();




app.use(express.static(path.join(__dirname, '.')));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '', url: 'https://api.eu.mailgun.net' });

app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const data = {
        from: 'Excited User <mailgun@lodlavki-sponsorloop.me>',
        to: to,
        subject: subject,
        text: text
    };

    mg.messages.create('lodlavki-sponsorloop.me', data)
        .then(msg => {
            console.log(msg);
            res.status(200).send('Email sent');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error sending email');
        });
});

module.exports = mg;