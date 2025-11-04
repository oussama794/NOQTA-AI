import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddNoteFAB() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState("");

  const categories = ["All", "Work", "Ideas", "Personal", "AI", "Sport", "Study"];

  const handleSelect = (cat) => {
    setOpen(false);
    navigate("/note/new", { state: { category: cat } });
  };

  const handleCreateWithCustom = () => {
    const trimmed = custom.trim();
    if (!trimmed) return;
    setOpen(false);
    setCustom("");
    navigate("/note/new", { state: { category: trimmed } });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
      {open && (
        <div className="mb-2 rounded-xl border border-zenith bg-white p-2 shadow-xl dark:bg-gray-800 dark:border-gray-700">
          <div className="text-xs font-semibold mb-1 px-2 text-gray-600 dark:text-gray-300">New note category</div>
          <div className="flex items-center gap-2 px-2 pb-2">
            <input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCreateWithCustom(); }}
              placeholder="Custom category"
              className="flex-1 rounded-md border border-zenith bg-white px-2 py-1 text-sm text-gray-700 shadow-sm dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            <button
              onClick={handleCreateWithCustom}
              className="px-2 py-1 rounded-md text-xs bg-nova text-white hover:opacity-90"
              title="Create with custom category"
            >
              Create
            </button>
          </div>
          <div className="max-h-60 overflow-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => handleSelect(c)}
                className="block w-full text-left px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-gradient-to-r from-nova to-azure text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition"
        title="Add note"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
