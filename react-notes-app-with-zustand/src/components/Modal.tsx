type ModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

function Modal({
  isOpen,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSave,
  onCancel,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit Note</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 w-full mb-4"
        />
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={5}
          className="border-2 border-gray-300 rounded-md p-2 w-full mb-4"
        />
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="bg-red-600 cursor-pointer rounded text-white px-4 py-2">
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 cursor-pointer rounded text-white px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
