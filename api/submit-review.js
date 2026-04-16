const querystring = require("querystring");

const watiToken = process.env.WATI_API_TOKEN;
const recipientNumber = process.env.WHATSAPP_RECIPIENT_NUMBER;

export default async function handler(req, res) {
  if (req.method === "POST") {
    let body = req.body || "";
    if (typeof body === "string") {
      body = querystring.parse(body);
    }

    const { project, rating, review } = body;
    if (!project || !rating || !review) {
      return res
        .status(400)
        .json({ error: "Missing project, rating, or review" });
    }

    const message = `New review for ${project}: Rating ${rating} stars\nReview: ${review}`;

    try {
      const response = await fetch("https://app.wati.io/api/v1/sendMessage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${watiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: recipientNumber,
          message: message,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("WATI error:", response.status, errorText);
        return res.status(500).json({ error: "Failed to send message" });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send message" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
