import axios from "axios";

export const summarizeText = async (text) => {
  const res = await axios.post("/api/ai", { action: "summarize", text });
  return res.data.result;
};

export const rephraseText = async (text) => {
  const res = await axios.post("/api/ai", { action: "rephrase", text });
  return res.data.result;
};

export const completeText = async (text) => {
  const res = await axios.post("/api/ai", { action: "complete", text });
  return res.data.result;
};
