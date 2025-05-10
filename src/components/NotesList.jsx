import React from "react";
import "../styles/NotesList.css";

function NotesList({ notes, group }) {
  if (!group) {
    return <div className="notes-list-empty">Select a group to view notes.</div>;
  }
  if (!notes || notes.length === 0) {
    return <div className="notes-list-empty">No notes yet. Start writing!</div>;
  }
  return (
    <div className="notes-list">
      {notes.map((note, idx) => (
        <div key={idx} className="note-item">
          {note}
        </div>
      ))}
    </div>
  );
}

export default NotesList; 