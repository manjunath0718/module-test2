import React, { useRef, useState, useEffect } from "react";
import "../styles/CreateGroupModal.css";

function CreateGroupModal({ open, onClose, onCreate, colors }) {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (open && modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setGroupName("");
      setSelectedColor(colors[0]);
    }
  }, [open, colors]);

  if (!open) return null;

  const handleCreate = (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      onCreate(groupName.trim(), selectedColor);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" ref={modalRef}>
        <h2 className="modal-title">Create New group</h2>
        <form onSubmit={handleCreate}>
          <label className="modal-label">
            Group Name
            <input
              className="modal-input"
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              autoFocus
              required
            />
          </label>
          <label className="modal-label" style={{ marginTop: "1.5rem" }}>
            Choose colour
            <div className="modal-color-row">
              {colors.map((color) => (
                <button
                  type="button"
                  key={color}
                  className={`modal-color-btn${selectedColor === color ? " selected" : ""}`}
                  style={{ background: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Choose color ${color}`}
                />
              ))}
            </div>
          </label>
          <div className="modal-actions">
            <button
              className="modal-create-btn"
              type="submit"
              disabled={!groupName.trim()}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGroupModal;