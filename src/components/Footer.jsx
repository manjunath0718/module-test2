import React, { useState } from "react";
import "../styles/Footer.css";

function Footer({ onAddNote, disabled }) {
  const [input, setInput] = useState("");

  const handleInput = (e) => setInput(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddNote(input.trim());
      setInput("");
    }
  };

  return (
    <footer className="footer">
      <form className="footer-form" onSubmit={handleSubmit} autoComplete="off">
        <textarea
          className="footer-input"
          placeholder="Write a note..."
          value={input}
          onChange={handleInput}
          disabled={disabled}
          rows={3}
        />
        <button
          className="footer-arrow"
          type="submit"
          disabled={disabled || !input.trim()}
          aria-label="Add note"
        >
          <span>&#8594;</span>
        </button>
      </form>
    </footer>
  );
}

export default Footer; 