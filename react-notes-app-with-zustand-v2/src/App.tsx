import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { useNotesStore } from "./store";

function App() {
  const { notes, addNote, editNote, removeNote } = useNotesStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const openEditModal = (noteId: number) => {
    const note = notes.find(note => note.id === noteId);
    if (!note) return;
    setEditingNoteId(noteId);
    setEditTitle(note.title);
    setEditDescription(note.description);
    setIsModalOpen(true);
  };

  const handleEditSave = () => {
    if (editingNoteId === null) return;
    editNote(editingNoteId, editTitle, editDescription);
    setIsModalOpen(false);
    setEditingNoteId(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingNoteId(null);
  };

  const handleNoteAdd = () => {
    if (!title.trim() || !description.trim()) return;
    addNote(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Note App</h1>
      <div className="flex flex-col gap-3 mb-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-300 outline-none rounded-md p-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="border-2 border-gray-300 outline-none rounded-md p-2"
        />
        <button onClick={handleNoteAdd} className="bg-black cursor-pointer rounded-md text-white p-2">Add Note</button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-gray-100 flex items-center justify-between gap-4 rounded-lg p-3">
            <div className="flex flex-col gap-1">
              <p>{note.title}</p>
              <p>{note.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => openEditModal(note.id)} className="cursor-pointer text-blue-500">
                <Pencil className="w-5 h-5" />
              </button>
              <button onClick={() => removeNote(note.id)} className="cursor-pointer text-red-500">
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded p-5">
            <h2 className="text-xl font-bold mb-4">Edit Note</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-300 rounded-md outline-none w-full mb-4 p-2"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="border-2 border-gray-300 rounded-md outline-none w-full mb-4 p-2"
            />
            <div className="flex justify-end gap-3">
              <button onClick={handleModalClose} className="bg-red-600 cursor-pointer rounded text-white px-4 py-2">
                Cancel
              </button>
              <button onClick={handleEditSave} className="bg-blue-600 cursor-pointer rounded text-white px-4 py-2">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
