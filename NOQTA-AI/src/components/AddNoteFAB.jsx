import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddNoteFAB() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/note/new")}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-nova to-azure text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition"
    >
      <Plus size={24} />
    </button>
  );
}
