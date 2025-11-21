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

  // Validation
  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text is required" });
  }

  if (!process.env.HF_API_KEY) {
    return res.status(500).json({ error: "HF_API_KEY not configured" });
  }

  try {
    let model;
    let prompt;
    let parameters;

    // Configure based on action
    switch (action) {
      case "summarize":
        model = "facebook/bart-large-cnn";
        prompt = text;
        parameters = {
          max_length: 130,
          min_length: 30,
          do_sample: false
        };
        break;

      case "rephrase":
        model = "mistralai/Mistral-7B-Instruct-v0.2";
        prompt = `[INST] Rephrase the following text in a different way while keeping the same meaning:\n\n${text} [/INST]`;
        parameters = {
          max_new_tokens: 250,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false
        };
        break;

      case "complete":
        model = "mistralai/Mistral-7B-Instruct-v0.2";
        prompt = `[INST] Continue writing the following text naturally:\n\n${text} [/INST]`;
        parameters = {
          max_new_tokens: 200,
          temperature: 0.8,
          top_p: 0.95,
          return_full_text: false
        };
        break;

      default:
        return res.status(400).json({ error: "Invalid action. Use: summarize, rephrase, or complete" });
    }

    // ✅ FIXED: Use the new router endpoint
    const apiUrl = `https://router.huggingface.co/v2/models/${model}`;

    console.log(`Calling HF API: ${apiUrl}`);
    console.log(`Action: ${action}`);
    console.log(`Input length: ${text.length} chars`);

    const response = await axios.post(
      apiUrl,
      {
        inputs: prompt,
        parameters: parameters
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 30000
      }
    );

    console.log("HF Response received");

    // Parse response based on model type
    let result = "";

    if (action === "summarize") {
      // BART returns array with summary_text
      if (Array.isArray(response.data) && response.data[0]?.summary_text) {
        result = response.data[0].summary_text;
      }
    } else {
      // Mistral returns array with generated_text
      if (Array.isArray(response.data) && response.data[0]?.generated_text) {
        result = response.data[0].generated_text;
        // Clean up the response - remove the instruction prompt if included
        result = result.replace(/\[INST\].*?\[\/INST\]/s, "").trim();
      }
    }

    if (!result) {
      console.error("⚠️ Unexpected response format:", JSON.stringify(response.data));
      return res.status(500).json({ 
        error: "Unexpected response format from AI model",
        details: response.data 
      });
    }

    console.log(`📤 Sending result (${result.length} chars)`);
    res.json({ result });

  } catch (err) {
    console.error("❌ HF API Error:");
    console.error("Status:", err.response?.status);
    console.error("Data:", JSON.stringify(err.response?.data, null, 2));
    console.error("Message:", err.message);

    // Check for specific error types
    if (err.response?.status === 503) {
      return res.status(503).json({ 
        error: "AI model is loading. Please try again in 20-30 seconds.",
        isLoading: true
      });
    }

    if (err.response?.status === 401 || err.response?.status === 403) {
      return res.status(500).json({ 
        error: "Invalid API key. Please check your HF_API_KEY in .env file."
      });
    }

    if (err.code === "ECONNABORTED") {
      return res.status(504).json({ 
        error: "Request timeout. The AI model took too long to respond."
      });
    }

    res.status(500).json({ 
      error: "AI request failed",
      details: err.response?.data?.error || err.message
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    hasApiKey: !!process.env.HF_API_KEY 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔑 API Key configured: ${process.env.HF_API_KEY ? 'Yes' : 'No'}`);
});