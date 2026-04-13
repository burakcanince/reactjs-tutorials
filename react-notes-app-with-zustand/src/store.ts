import { create } from "zustand";

type Notes = {
  id: number
  title: string
  description: string
}

type NotesStore = {
  notes: Notes[]
  addNote: (title: string, description: string) => void
  editNote: (id: number, title: string, description: string) => void
  removeNote: (id: number) => void
}

export const useNotesStore = create<NotesStore>((set) => ({
    notes: [],
    addNote: (title, description) => {
      set((state) => ({
        notes: [
          ...state.notes,
          {
            id: state.notes.length + 1,
            title,
            description,
          },
        ],
      }));
    },
    editNote: (id, title, description) => {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id ? { ...note, title, description } : note
        ),
      }));
    },
    removeNote: (id) => {
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
      }));
    },
}));
