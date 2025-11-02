import { useParams, useNavigate } from "react-router-dom";
import { useNotesStore } from "../store/notesStore";
import { useState, useEffect } from "react";
import AIActionFABs from "../components/AIActionFABs";
import { ArrowLeft } from "lucide-react";

export default function NoteDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notes, addNote, updateNote } = useNotesStore();
    const existing = notes.find((n) => n.id === id);
    const [note, setNote] = useState(existing || { id: crypto.randomUUID(), title: "", content: "" });
    const [isEditing, setIsEditing] = useState(!existing);

    useEffect(() => {
        if (existing) {
            setNote(existing);
            setIsEditing(false);
        }
    }, [id, existing]);

    const handleSave = () => {
        if (note.title.trim() || note.content.trim()) {
            existing ? updateNote(id, note) : addNote(note);
            setIsEditing(false);
            if (!existing) {
                navigate("/");
            }
        }
    };

    const handleTitleChange = (e) => {
        setNote({ ...note, title: e.target.value });
    };

    const handleContentChange = (e) => {
        setNote({ ...note, content: e.target.value });
    };

    const displayTitle = note.title || "Header";
    const displayContent = note.content || "Click to edit...";

    return (
        <div className="min-h-screen bg-gradient-to-b from-serene to-zenith p-3 sm:p-6 flex items-start sm:items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-2xl w-full relative min-h-[400px] my-4 sm:my-0">
                {/* Header with Return Button */}
                <div className="flex items-center gap-3 mb-4">
                    <button
                        onClick={() => navigate("/")}
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-all hover:scale-110 shadow-sm flex-shrink-0"
                        title="Return to home"
                    >
                        <ArrowLeft size={20} className="text-gray-700" />
                    </button>
                    {isEditing ? (
                        <input
                            type="text"
                            className="flex-1 text-xl sm:text-2xl font-semibold text-nova border-b-2 border-zenith focus:border-nova outline-none bg-transparent"
                            placeholder="Title..."
                            value={note.title}
                            onChange={handleTitleChange}
                            autoFocus
                        />
                    ) : (
                        <h1
                            className="flex-1 text-xl sm:text-2xl font-semibold text-nova cursor-pointer hover:opacity-80 transition"
                            onClick={() => setIsEditing(true)}
                        >
                            {displayTitle}
                        </h1>
                    )}
                </div>

                {isEditing ? (
                    <>
                        <textarea
                            className="w-full text-gray-700 leading-relaxed resize-none outline-none bg-transparent mb-16 sm:mb-20"
                            placeholder="Start writing..."
                            value={note.content}
                            onChange={handleContentChange}
                            rows={15}
                            style={{ minHeight: '300px' }}
                        />
                        <button
                            onClick={handleSave}
                            className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-gradient-to-r from-nova to-azure text-white px-4 sm:px-6 py-2 rounded-lg hover:scale-105 transition shadow-md text-sm sm:text-base"
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <div
                            className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-16 sm:mb-20 cursor-pointer hover:opacity-80 transition min-h-[300px]"
                            onClick={() => setIsEditing(true)}
                        >
                            {displayContent}
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-gradient-to-r from-nova to-azure text-white px-4 sm:px-6 py-2 rounded-lg hover:scale-105 transition shadow-md text-sm sm:text-base"
                        >
                            Edit
                        </button>
                    </>
                )}

                <AIActionFABs note={note} setNote={setNote} />
            </div>
        </div>
    );
}
