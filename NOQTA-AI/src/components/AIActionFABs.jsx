import { useState } from "react";
import { Sparkles, RefreshCw, Check, Loader2 } from "lucide-react";
import { summarizeText, rephraseText, completeText } from "../services/aiService";

export default function AIActionFABs({ note, setNote }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async (type) => {
        if (!note.content || note.content.trim() === "") {
            alert("Please add some content to your note first!");
            setIsExpanded(false);
            return;
        }

        setIsLoading(true);
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
        } catch (error) {
            alert(error.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
            setIsExpanded(false);
        }
    };

    const toggleExpanded = () => {
        if (!isLoading) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6">
            <div className="relative">
                {/* Three sub-buttons that appear when expanded */}
                {isExpanded && !isLoading && (
                    <>
                        {/* Top-left button - Light blue with refresh icon (Rephrase) */}
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

                        {/* Top-right button - Dark purple with sparkles icon (Summarize) */}
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

                        {/* Bottom-left button - Green with checkmark (Complete) */}
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

                {/* Main AI Button - Black with blue outline */}
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
        </div>
    );
}