require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter Setup
let transporter;

async function setupTransporter() {
  if (process.env.EMAIL_USER === 'your-email@gmail.com' || !process.env.EMAIL_USER) {
    console.log('No real email provided in .env, generating a temporary Test Email Account...');
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
    console.log(`Test Email System Ready! (Will print a link to generated emails)`);
  } else {
    // Transport configuration (using Gmail as the default example)
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    // Verify email connection
    transporter.verify((error, success) => {
      if (error) {
        console.log('Error configuring email:', error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });
  }
}
setupTransporter();


// Booking Endpoint
app.post('/api/book', async (req, res) => {
  const { name, email, interest, date, travelers, requirements } = req.body;

  // Validate basic inputs
  if (!name || !email || !date) {
    return res.status(400).json({ error: 'Please provide name, email, and date.' });
  }

  // Define Email Content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // Send confirmation to the user
    bcc: process.env.EMAIL_USER, // Also send a blind carbon copy to you (the admin)
    subject: `Booking Confirmation: ${interest || 'Your Adventure'} with WANDER`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #2c3e50;">Booking Request Received!</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for choosing WANDER! We have received your booking request. Our team will review the details and get back to you shortly to finalize your itinerary.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">Your Travel Details:</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Interested In:</strong> ${interest || 'General Inquiry'}</li>
            <li style="margin-bottom: 10px;"><strong>Travel Date:</strong> ${date}</li>
            <li style="margin-bottom: 10px;"><strong>Travelers:</strong> ${travelers}</li>
            <li style="margin-bottom: 10px;"><strong>Special Requirements:</strong> ${requirements || 'None'}</li>
          </ul>
        </div>
        
        <p>If you have any immediate questions, feel free to reply directly to this email.</p>
        <br/>
        <p>Best regards,<br/><strong>The WANDER Team</strong></p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Booking confirmation sent to ${email}`);
    
    // If using the ethereal test account, we can print a URL to view the email!
    if (info.messageId) {
       console.log('Preview URL (Ctrl+Click to view email): %s', nodemailer.getTestMessageUrl(info));
    }
    
    res.status(200).json({ message: 'Booking successful and email sent!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send confirmation email. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
