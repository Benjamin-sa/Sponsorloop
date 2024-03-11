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
  let mailOptions = {
    from: 'Sponsorloop LodLavki <mailgun@lodlavki-sponsorloop.me>',
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.html
  };

  mg.messages.create('lodlavki-sponsorloop.me', mailOptions)
    .then(msg => {
      console.log('Email sent: ' + msg.id);
      res.status(200).send('Email sent: ' + msg.id);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = mg;
