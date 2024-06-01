const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(cors());

app.post("/send-email", (req, res) => {
  const { name, email: email, message } = req.body;

  console.log(req.body);
  if (!name || !email || !message) {
    return res.status(400).send("Bad Request: Missing required fields.");
  }

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Replace with your SMTP host
    port: 587, // Replace with your SMTP port (usually 587 or 465)
    secure: false, // True for port 465, false for other ports
    auth: {
      user: "sayanchatterjee149@gmail.com", // Replace with your SMTP username
      pass: "davnbxvivmzvucxb", // Replace with your SMTP password
    },
  });

  // Set up email data
  const mailOptions = {
    from: email, // Sender address
    to: "sayanchatterjee149@gmail.com", // List of recipients
    subject: "New Message from Contact Form", // Subject line
    text: `You have a new message from ${name} (${email}):\n\n${message}`, // Plain text body
    html: `<p>You have a new message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`, // HTML body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ Error: error.message });
    }
    res.status(200).send({ message: "Send E-mail" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
