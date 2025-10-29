import { create } from "zustand";

export const useNotesStore = create((set) => ({
  notes: JSON.parse(localStorage.getItem("notes")) || [],
  addNote: (note) => set((state) => {
    const updated = [...state.notes, note];
    localStorage.setItem("notes", JSON.stringify(updated));
    return { notes: updated };
  }),
  deleteNote: (id) => set((state) => {
    const updated = state.notes.filter(n => n.id !== id);
    localStorage.setItem("notes", JSON.stringify(updated));
    return { notes: updated };
  }),
  updateNote: (id, data) => set((state) => {
    const updated = state.notes.map(n => n.id === id ? {...n, ...data} : n);
    localStorage.setItem("notes", JSON.stringify(updated));
    return { notes: updated };
  }),
}));
