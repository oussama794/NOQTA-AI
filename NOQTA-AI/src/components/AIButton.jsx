import { runAI } from '../services/aiService';
import { useState } from 'react';

export default function AIButton({ action, noteText, onResult }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const result = await runAI(action, noteText);
      onResult(result);
    } catch {
      alert('AI request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-xl"
    >
      {loading ? 'Thinking...' : action}
    </button>
  );
}
