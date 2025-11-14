import axios from "axios";

const API_URL = import.meta.env.DEV
  ? "http://localhost:3000/api/ai"   // Local dev 
  : "/api/ai";                       // Production on Vercel

export const summarizeText = async (text) => {
  const res = await axios.post(API_URL, { action: "summarize", text });
  return res.data.result;
};

export const rephraseText = async (text) => {
  const res = await axios.post(API_URL, { action: "rephrase", text });
  return res.data.result;
};

export const completeText = async (text) => {
  const res = await axios.post(API_URL, { action: "complete", text });
  return res.data.result;
};
