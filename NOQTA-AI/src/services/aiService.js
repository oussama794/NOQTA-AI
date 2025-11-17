import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

export const summarizeText = async (text) => {
  const res = await axios.post(API_URL, {
    action: "summarize",
    text,
  });
  return res.data.result;
};

export const rephraseText = async (text) => {
  const res = await axios.post(API_URL, {
    action: "rephrase",
    text,
  });
  return res.data.result;
};

export const completeText = async (text) => {
  const res = await axios.post(API_URL, {
    action: "complete",
    text,
  });
  return res.data.result;
};
