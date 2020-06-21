const express = require("express");
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const validateContactForm = require("../../validation/validateContactForm");

require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const receiverEmail = process.env.RECEIVER_EMAIL;

// @route POST api/contact/send-email
// @desc Submit contact form
// @access Public

router.post("/send-email", (req, res) => {
    // Form validation
    const { errors, isValid } = validateContactForm(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const msg = {
      to: receiverEmail, // Change to email address that you want to receive messages on
      from: receiverEmail, // Make sure has been sender verified on sendgrid
      subject: "FitSpire Contact Form: " + req.body.subject,
      text: `Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`,
      html: `<p>Name: ${req.body.name}</p><p>Email: ${req.body.email}</p><p>Message:</p><p>${req.body.message}</p>`,
    };

    sgMail.send(msg)
      .then(msg => res.json(msg))
      .catch(err => console.log(err.response.body))
    
});

module.exports = router;