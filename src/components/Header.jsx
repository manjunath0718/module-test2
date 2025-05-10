import React from "react";
import "../styles/Header.css";

function Header({ group }) {
  // Always show the same header: profile circle and 'My Notes', left-aligned
  const initials = group ? group.initials : "--";
  const color = group ? group.color : "#1560ff";

  return (
    <header className="header">
      <span className="header-profile-circle" style={{ background: color }}>{initials}</span>
      <span className="header-title">My Notes</span>
    </header>
  );
}

export default Header; 