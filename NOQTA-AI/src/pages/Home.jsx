import NoteCard from "../components/NoteCard";
import AddNoteFAB from "../components/AddNoteFAB";
import { useNotesStore } from "../store/notesStore";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Home() {
    const { notes } = useNotesStore();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredNotes = notes.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase())
    );

    const filters = ["All", "Work", "Ideas", "Personal", "AI"];

    return (
        <div className="min-h-screen bg-gradient-to-b from-serene to-zenith px-4 py-6">
            {/* App Title */}
            <h1 className="text-center text-3xl font-bold text-nova mb-4">NOQTA</h1>

            {/* Search Bar */}
            <div className="flex items-center justify-center mb-3">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white text-gray-700 rounded-xl pl-10 pr-3 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-nova"
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="flex justify-center gap-2 mb-5 flex-wrap">
                {filters.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-3 py-1 text-sm rounded-full border ${filter === cat
                            ? "bg-nova text-white border-nova"
                            : "border-zenith text-gray-600"
                            } transition`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => <NoteCard key={note.id} note={note} />)
                ) : (
                    <p className="text-center col-span-2 md:col-span-3 lg:col-span-4 text-gray-500">No notes yet.</p>
                )}
            </div>

            {/* Add Note FAB */}
            <AddNoteFAB />
        </div>
    );
}
