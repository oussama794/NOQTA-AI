import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  const { action, text } = req.body;

  try {
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        inputs: text,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.6
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const output = response.data?.generated_text || "No output returned";

    res.json({
      result:
        action === "summarize"
          ? output.slice(0, 200)
          : output
    });

  } catch (err) {
    console.error("HF ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "HF request failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
