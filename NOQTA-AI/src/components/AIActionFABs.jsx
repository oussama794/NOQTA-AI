import { useState } from "react";
import { Sparkles, RefreshCw, Check, Loader2, AlertCircle } from "lucide-react";
import { summarizeText, rephraseText, completeText } from "../services/aiService";

export default function AIActionFABs({ note, setNote }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentAction, setCurrentAction] = useState("");

    const handleAction = async (type) => {
        if (!note.content || note.content.trim() === "") {
            setError("Please add some content to your note first!");
            setTimeout(() => setError(null), 3000);
            setIsExpanded(false);
            return;
        }

        setIsLoading(true);
        setCurrentAction(type);
        setError(null);

        try {
            let result;
            switch (type) {
                case "Refresh":
                    result = await rephraseText(note.content);
                    setNote({ ...note, content: result });
                    break;
                case "Enhance":
                    result = await summarizeText(note.content);
                    setNote({ ...note, content: result });
                    break;
                case "Complete":
                    result = await completeText(note.content);
                    setNote({ ...note, content: result });
                    break;
                default:
                    break;
            }
            
            // Show success briefly
            setCurrentAction("");
        } catch (error) {
            console.error("AI Action Error:", error);
            setError(error.message || "An error occurred. Please try again.");
            
            // Auto-hide error after 5 seconds
            setTimeout(() => setError(null), 5000);
        } finally {
            setIsLoading(false);
            setIsExpanded(false);
            setCurrentAction("");
        }
    };

    const toggleExpanded = () => {
        if (!isLoading) {
            setIsExpanded(!isExpanded);
            setError(null); // Clear any errors when toggling
        }
    };

    const getActionLabel = (type) => {
        const labels = {
            "Refresh": "Rephrasing...",
            "Enhance": "Summarizing...",
            "Complete": "Completing..."
        };
        return labels[type] || "Processing...";
    };

    return (
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6">
            {/* Error Toast */}
            {error && (
                <div className="absolute bottom-20 right-0 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg mb-2 max-w-xs animate-slide-up flex items-start gap-2">
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
                <div className="absolute bottom-20 right-0 bg-nova text-white px-4 py-3 rounded-lg shadow-lg mb-2 animate-slide-up flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <p className="text-sm font-medium">{getActionLabel(currentAction)}</p>
                </div>
            )}

            <div className="relative">
                {/* Sub-buttons */}
                {isExpanded && !isLoading && (
                    <>
                        {/* Rephrase Button */}
                        <button
                            onClick={() => handleAction("Refresh")}
                            className="absolute bg-azure text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 z-10 border-2 border-blue-600"
                            style={{
                                bottom: '70px',
                                left: '-30px',
                                animation: 'fadeIn 0.2s ease-out forwards'
                            }}
                            title="Rephrase text"
                        >
                            <RefreshCw size={20} />
                        </button>

                        {/* Summarize Button */}
                        <button
                            onClick={() => handleAction("Enhance")}
                            className="absolute bg-purple-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 z-10 border-2 border-purple-900"
                            style={{
                                bottom: '70px',
                                right: '-30px',
                                animation: 'fadeIn 0.2s ease-out 0.05s forwards'
                            }}
                            title="Summarize text"
                        >
                            <Sparkles size={20} />
                        </button>

                        {/* Complete Button */}
                        <button
                            onClick={() => handleAction("Complete")}
                            className="absolute bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 z-10 border-2 border-green-700"
                            style={{
                                bottom: '0px',
                                left: '-30px',
                                animation: 'fadeIn 0.2s ease-out 0.1s forwards'
                            }}
                            title="Complete text"
                        >
                            <Check size={20} />
                        </button>
                    </>
                )}

                {/* Main AI Button */}
                <button
                    onClick={toggleExpanded}
                    disabled={isLoading}
                    className="relative bg-black text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all border-2 border-nova z-20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <Sparkles 
                            size={20} 
                            className={`${isExpanded ? "rotate-180 transition-transform duration-300" : "transition-transform duration-300"}`} 
                        />
                    )}
                </button>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}