import React from "react";
import "./NoteCard.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formattedDate = new Date(note.createdAt).toLocaleDateString();

  return (
    <div className="note-card">
      <div className="note-header">
        <h2 className="note-title">{note.title}</h2>
        <span className="note-date">{formattedDate}</span>
      </div>

      <p className="note-description">{note.description}</p>

      <div className="note-actions">
        <button className="edit-btn" onClick={() => onEdit(note)}>
          <FaEdit />
        </button>

        <button className="delete-btn" onClick={() => onDelete(note._id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
