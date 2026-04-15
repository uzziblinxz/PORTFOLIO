const twilio = require('twilio');
const querystring = require('querystring');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = querystring.parse(req.body || '');
    const { project, rating, review } = body;

    const message = `New review for ${project}: Rating ${rating} stars\nReview: ${review}`;

    try {
      await client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886', // Twilio sandbox WhatsApp number - replace with your Twilio number
        to: 'whatsapp:+YOUR_WHATSAPP_NUMBER' // Replace with your WhatsApp number
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}