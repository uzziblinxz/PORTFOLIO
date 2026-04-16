const querystring = require("querystring");

const watiToken = process.env.WATI_API_TOKEN;
const recipientNumber = process.env.WHATSAPP_RECIPIENT_NUMBER;

function sanitizePhone(phone) {
  if (!phone) return "";
  const trimmed = phone.toString().trim();
  if (trimmed.startsWith("+")) {
    return "+" + trimmed.slice(1).replace(/[^0-9]/g, "");
  }
  return trimmed.replace(/[^0-9]/g, "");
}

async function sendWatiMessage(body) {
  const endpoints = [
    "https://app.wati.io/api/v1/message/send",
    "https://app.wati.io/api/v1/sendMessage",
  ];

  let lastError = null;
  for (const endpoint of endpoints) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${watiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const responseData = await response.json();
      return { ok: true, endpoint, status: 200, data: responseData };
    }

    const errorText = await response.text();
    lastError = { endpoint, status: response.status, error: errorText };
    console.error(`WATI error at ${endpoint}:`, response.status, errorText);
  }

  return { ok: false, lastError };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!watiToken || !recipientNumber) {
    return res.status(500).json({
      error:
        "WhatsApp settings are not configured. Please set WATI_API_TOKEN and WHATSAPP_RECIPIENT_NUMBER.",
    });
  }

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

  const phone = sanitizePhone(recipientNumber);
  if (!phone) {
    return res
      .status(500)
      .json({ error: "Invalid WhatsApp recipient number." });
  }

  const message = `New review for ${project}: Rating ${rating} stars\nReview: ${review}`;

  try {
    const result = await sendWatiMessage({ phone, message });
    if (!result.ok) {
      const debugInfo = result.lastError
        ? ` [${result.lastError.endpoint}: Status ${result.lastError.status}]`
        : "";
      return res.status(500).json({
        error:
          "Unable to send WhatsApp notification. Please check your WATI API token and WhatsApp recipient number." +
          debugInfo,
      });
    }

    return res.status(200).json({
      success: true,
      endpoint: result.endpoint,
      message: "Review submitted and WhatsApp message sent!",
    });
  } catch (error) {
    console.error("Unexpected WATI error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
