import React, { useEffect, useState } from "react";
import "./NoteModal.css";

const NoteModal = ({ onClose, addNote, editNote, currentNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentNote) {
      editNote(currentNote._id, title, description);
    } else {
      addNote(title, description);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 className="modal-title">
          {currentNote ? "Edit Note" : "Add New Note"}
        </h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="modal-input"
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="modal-textarea"
            required
          />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="add-btn">
              {currentNote ? "Update Note" : "Add Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
