import { useState } from "react";
import { Sparkles, RefreshCw, Check } from "lucide-react";

export default function AIActionFABs({ note, setNote }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAction = async (type) => {
        // TODO: connect to aiService
        alert(`${type} feature coming soon`);
        setIsExpanded(false);
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6">
            <div className="relative">
                {/* Three sub-buttons that appear when expanded */}
                {isExpanded && (
                    <>
                        {/* Top-left button - Light blue with refresh icon */}
                        <button
                            onClick={() => handleAction("Refresh")}
                            className="absolute bg-azure text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 z-10 border-2 border-blue-600"
                            style={{
                                bottom: '70px',
                                left: '-30px',
                                animation: 'fadeIn 0.2s ease-out forwards'
                            }}
                        >
                            <RefreshCw size={20} />
                        </button>

                        {/* Top-right button - Dark purple with sparkles icon */}
                        <button
                            onClick={() => handleAction("Enhance")}
                            className="absolute bg-purple-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 z-10 border-2 border-purple-900"
                            style={{
                                bottom: '70px',
                                right: '-30px',
                                animation: 'fadeIn 0.2s ease-out 0.05s forwards'
                            }}
                        >
                            <Sparkles size={20} />
                        </button>

                        {/* Bottom-left button - Green with checkmark */}
                        <button
                            onClick={() => handleAction("Complete")}
                            className="absolute bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 z-10 border-2 border-green-700"
                            style={{
                                bottom: '0px',
                                left: '-30px',
                                animation: 'fadeIn 0.2s ease-out 0.1s forwards'
                            }}
                        >
                            <Check size={20} />
                        </button>
                    </>
                )}

                {/* Main AI Button - Black with blue outline */}
                <button
                    onClick={toggleExpanded}
                    className="relative bg-black text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all border-2 border-nova z-20"
                >
                    <Sparkles size={20} className={`${isExpanded ? "rotate-180 transition-transform duration-300" : "transition-transform duration-300"}`} />
                </button>
            </div>
        </div>
    );
}
