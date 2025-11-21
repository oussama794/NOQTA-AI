import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

// Helper function to handle API errors
const handleApiError = (error, action) => {
  console.error(`${action} error:`, error);

  // Check if it's a network error
  if (!error.response) {
    throw new Error("Cannot connect to server. Make sure the backend is running on port 5000.");
  }

  // Get error message from response
  const errorData = error.response.data;
  
  // Handle specific error cases
  if (errorData.isLoading) {
    throw new Error("🔄 AI model is warming up. Please wait 20-30 seconds and try again.");
  }

  if (error.response.status === 503) {
    throw new Error("⏳ AI model is loading. This usually takes 20-30 seconds on first use.");
  }

  if (error.response.status === 401) {
    throw new Error("🔑 API key error. Please check your server configuration.");
  }

  if (error.response.status === 504) {
    throw new Error("⏱️ Request timeout. Try with shorter text or try again.");
  }

  if (error.response.status === 400) {
    throw new Error(errorData.error || "Invalid request. Please check your input.");
  }

  // Generic error with details if available
  const message = errorData.error || errorData.details || "Something went wrong. Please try again.";
  throw new Error(message);
};

// Retry logic for model loading
const callApiWithRetry = async (action, text, maxRetries = 3, retryDelay = 2000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await axios.post(
        API_URL,
        { action, text },
        { timeout: 35000 } // 35 second timeout
      );
      return res.data.result;
    } catch (error) {
      lastError = error;
      
      // If it's a loading error and we have retries left, wait and retry
      if (error.response?.status === 503 && attempt < maxRetries) {
        console.log(`Model loading... Retry ${attempt}/${maxRetries} in ${retryDelay/1000}s`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        continue;
      }
      
      // Otherwise, throw the error
      handleApiError(error, action);
    }
  }
  
  // If we've exhausted retries, throw the last error
  handleApiError(lastError, action);
};

// Main API functions
export const summarizeText = async (text) => {
  if (!text || text.trim().length === 0) {
    throw new Error("Please enter some text to summarize.");
  }

  if (text.length < 50) {
    throw new Error("Text is too short to summarize. Please add more content.");
  }

  try {
    return await callApiWithRetry("summarize", text);
  } catch (error) {
    throw error;
  }
};

export const rephraseText = async (text) => {
  if (!text || text.trim().length === 0) {
    throw new Error("Please enter some text to rephrase.");
  }

  if (text.length < 10) {
    throw new Error("Text is too short to rephrase. Please add more content.");
  }

  try {
    return await callApiWithRetry("rephrase", text);
  } catch (error) {
    throw error;
  }
};

export const completeText = async (text) => {
  if (!text || text.trim().length === 0) {
    throw new Error("Please enter some text to complete.");
  }

  if (text.length < 10) {
    throw new Error("Text is too short to complete. Please add more content.");
  }

  try {
    return await callApiWithRetry("complete", text);
  } catch (error) {
    throw error;
  }
};

// Health check function 
export const checkServerHealth = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/health", {
      timeout: 5000
    });
    return res.data;
  } catch (error) {
    return { status: "offline", hasApiKey: false };
  }
};