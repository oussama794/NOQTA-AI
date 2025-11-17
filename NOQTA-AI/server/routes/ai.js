import axios from "axios";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { action, text } = req.body;

    if (!text) return res.status(400).json({ error: "Missing text" });

    let HF_MODEL;
    let prompt = text;

    if (action === "summarize") HF_MODEL = "facebook/bart-large-cnn";
    else if (action === "rephrase") {
      HF_MODEL = "t5-small";
      prompt = `paraphrase: ${text}`;
    } else if (action === "complete") HF_MODEL = "gpt2";
    else return res.status(400).json({ error: "Unknown action" });

    const HF_API_KEY = process.env.HF_API_KEY;
    if (!HF_API_KEY)
      return res.status(500).json({ error: "HF_API_KEY missing" });

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

    let result = "";

    if (Array.isArray(hfResponse.data)) {
      result = hfResponse.data[0]?.generated_text || "";
    } else if (hfResponse.data.generated_text) {
      result = hfResponse.data.generated_text;
    }

    res.status(200).json({ result });
  } catch (err) {
    console.error("HF ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
