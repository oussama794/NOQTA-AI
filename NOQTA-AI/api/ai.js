import axios from "axios";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });

    const { action, text } = req.body;
    if (!text) return res.status(400).json({ error: "Missing text" });

    // Map actions to free-friendly models
    let HF_MODEL;
    let prompt = text;

    if (action === "summarize") {
      HF_MODEL = "facebook/bart-large-cnn";
      prompt = text;
    } else if (action === "rephrase") {
      HF_MODEL = "t5-small";
      prompt = `paraphrase: ${text}`;
    } else if (action === "complete") {
      HF_MODEL = "gpt2";
      prompt = text;
    } else {
      return res.status(400).json({ error: "Unknown action" });
    }

    const HF_API_KEY = process.env.HF_API_KEY;
    if (!HF_API_KEY) return res.status(500).json({ error: "HF_API_KEY missing" });

    const hfResponse = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 200000,
      }
    );

    // Handle model loading errors
    if (hfResponse.data.error) {
      return res.status(503).json({ error: hfResponse.data.error });
    }

    // Extract generated text
    let result = "";
    if (Array.isArray(hfResponse.data)) {
      result = hfResponse.data[0]?.generated_text || "";
    } else if (hfResponse.data.generated_text) {
      result = hfResponse.data.generated_text;
    }

    res.status(200).json({ result });
  } catch (err) {
    console.error("HF API Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message || "Server Error" });
  }
}
