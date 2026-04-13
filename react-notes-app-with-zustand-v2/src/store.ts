import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Note = {
  id: number;
  title: string;
  description: string;
};

type NotesStore = {
  notes: Note[];
  addNote: (title: string, description: string) => void;
  editNote: (id: number, title: string, description: string) => void;
  removeNote: (id: number) => void;
};

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote: (title, description) => {
        const newNote: Note = {
          id: get().notes.length + 1,
          title,
          description,
        };
        set({ notes: [...get().notes, newNote] });
      },

      editNote: (id, title, description) => {
        const updated = get().notes.map(note =>
          note.id === id ? { ...note, title, description } : note
        );
        set({ notes: updated });
      },

      removeNote: (id) => {
        const filtered = get().notes.filter(note => note.id !== id);
        set({ notes: filtered });
      },
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
