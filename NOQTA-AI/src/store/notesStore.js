import { create } from "zustand";

export const useNotesStore = create((set, get) => ({
  notes: JSON.parse(localStorage.getItem("notes")) || [],

  addNote: (note) => {
    const newNotes = [...get().notes, note];
    localStorage.setItem("notes", JSON.stringify(newNotes));
    set({ notes: newNotes });
  },

  updateNote: (id, updated) => {
    const newNotes = get().notes.map((n) => (n.id === id ? { ...n, ...updated } : n));
    localStorage.setItem("notes", JSON.stringify(newNotes));
    set({ notes: newNotes });
  },

  deleteNote: (id) => {
    const newNotes = get().notes.filter((n) => n.id !== id);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    set({ notes: newNotes });
  },
}));
