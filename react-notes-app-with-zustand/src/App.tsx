import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { useNotesStore } from "./store";
import Modal from "./components/Modal";

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

      <Modal
        isOpen={isModalOpen}
        title={editTitle}
        description={editDescription}
        onTitleChange={setEditTitle}
        onDescriptionChange={setEditDescription}
        onSave={handleEditSave}
        onCancel={handleModalClose}
      />
    </div>
  );
}

export default App;
