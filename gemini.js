import fetch from "node-fetch";

// ❗ Gemini API Key এখানে সরাসরি
const GEMINI_API_KEY = "AIzaSyAbeygPcTWJ1fdb1lyJk1HTnBEm0_CeIzE";

export default async function handler(req, res) {
  try {
    // URL Example: /api/gemini=hello
    const prompt = req.url.split("gemini=")[1] || "";

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    // Gemini API call
    const response = await fetch(
      "https://api.generativeai.googleapis.com/v1beta2/models/gemini-2.5-flash:generateText",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: {
            text: prompt
          }
        })
      }
    );

    const data = await response.json();
    const geminiReply =
      data?.candidates?.[0]?.content?.[0]?.text || "No reply from Gemini";

    // Add your credit at the bottom
    const finalReply = `${geminiReply}\n\nCreated by SPEED_X 🚀`;

    res.status(200).json({ reply: finalReply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}