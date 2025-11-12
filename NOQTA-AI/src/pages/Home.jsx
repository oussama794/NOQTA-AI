import NoteCard from "../components/NoteCard";
import AddNoteFAB from "../components/AddNoteFAB";
import DarkModeToggle from "../components/DarkModeToggle";
import { useNotesStore } from "../store/notesStore";
import { useState } from "react";
import { Search, Settings } from "lucide-react";

export default function Home() {
    const { notes } = useNotesStore();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [showSettings, setShowSettings] = useState(false);

    const normalizedSearch = search.trim().toLowerCase();
    const filteredNotes = notes.filter((n) => {
        const matchesSearch = n.title.toLowerCase().includes(normalizedSearch);
        const noteCategory = n.category || "All";
        const matchesCategory = filter === "All" ? true : noteCategory === filter;
        return matchesSearch && matchesCategory;
    });

    const baseCategories = ["All", "Work", "Ideas", "Personal", "AI", "Sport", "Study"];
    const noteCategories = Array.from(new Set(
        notes
            .map((n) => n.category)
            .filter((c) => c && c !== "All")
    ));
    const filters = [
        "All",
        ...baseCategories.filter((c) => c !== "All"),
        ...noteCategories.filter((c) => !baseCategories.includes(c)),
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-serene to-zenith px-4 py-6 dark:from-gray-900 dark:to-gray-950">
            {/* Top Bar with Dark Mode Toggle and Settings */}
            <div className="flex justify-between items-center mb-2">
                <button
                    onClick={() => setShowSettings(true)}
                    className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm shadow-sm transition hover:scale-105 bg-white border-zenith text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                    title="API Settings"
                >
                    <Settings size={16} />
                    <span>API Key</span>
                </button>
                <DarkModeToggle />
            </div>

            {/* App Title */}
            <h1 className="text-center text-3xl font-bold text-nova mb-4 dark:text-white">NOQTA</h1>

            {/* Search Bar */}
            <div className="flex items-center justify-center mb-3">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white text-gray-700 rounded-xl pl-10 pr-3 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-nova dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:ring-azure"
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-5 overflow-x-auto whitespace-nowrap py-1 w-full justify-start lg:justify-center">
                {filters.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`flex-shrink-0 px-3 py-1 text-sm rounded-full border ${filter === cat
                            ? "bg-nova text-white border-nova"
                            : "border-zenith text-gray-600 dark:border-gray-700 dark:text-gray-300"
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
                    <p className="text-center col-span-2 md:col-span-3 lg:col-span-4 text-gray-500 dark:text-gray-400">No notes yet.</p>
                )}
            </div>

            {/* Add Note FAB */}
            <AddNoteFAB />
            
        </div>
    );
}