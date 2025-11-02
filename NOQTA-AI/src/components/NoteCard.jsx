import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useNotesStore } from "../store/notesStore";

export default function NoteCard({ note }) {
    const navigate = useNavigate();
    const { deleteNote } = useNotesStore();

    const handleDelete = (e) => {
        e.stopPropagation(); // Prevent navigation when clicking delete
        if (window.confirm("Are you sure you want to delete this note?")) {
            deleteNote(note.id);
        }
    };

    return (
        <div
            onClick={() => navigate(`/note/${note.id}`)}
            className="bg-white border border-serene rounded-2xl p-4 shadow-sm hover:shadow-md cursor-pointer transition relative group"
        >
            <button
                onClick={handleDelete}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:scale-110 z-10"
                title="Delete note"
            >
                <Trash2 size={16} />
            </button>
            <div className="border-l-4 border-nova pl-3 pr-8">
                <h2 className="text-lg font-semibold mb-1">{note.title || "Untitled"}</h2>
                <p className="text-sm text-gray-500 line-clamp-3">{note.content}</p>
            </div>
        </div>
    );
}