import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NotesList from "./components/NotesList";
import Footer from "./components/Footer";
import "./styles/App.css";
import CreateGroupModal from "./components/CreateGroupModal";
import illustration from "./assets/illustration.png";

const GROUP_COLORS = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF"
];

// Helper to get initials
function getInitials(name) {
  if (!name) return "";
  const words = name.trim().split(" ").filter(Boolean);
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function Welcome() {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#dde7f6",
      borderRadius: "24px",
      position: "relative"
    }}>
      <img src={illustration} alt="Welcome Illustration" style={{ maxWidth: 340, width: "100%", marginBottom: 32 }} />
      <h2 style={{ color: "#0a2498", fontSize: "2.2rem", marginBottom: "1.5rem" }}>Welcome to Pocket Notes</h2>
      <p style={{ color: "#444", fontSize: "1.2rem", maxWidth: 480, textAlign: "center" }}>
        Select a group from the sidebar or create a new one to start taking notes!
      </p>
      <div style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: 0.8
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="8" rx="2" fill="#222" />
            <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: "1rem", color: "#222" }}>end-to-end encrypted</span>
        </span>
      </div>
    </div>
  );
}

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [groups, setGroups] = useState(() => {
    try {
      const stored = localStorage.getItem("pocket-notes-groups");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      localStorage.removeItem("pocket-notes-groups");
    }
    return [];
  });
  const [selectedGroup, setSelectedGroup] = useState(() => {
    try {
      const stored = localStorage.getItem("pocket-notes-selected-group");
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return null;
  });
  const [notes, setNotes] = useState([]);

  // Save groups to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("pocket-notes-groups", JSON.stringify(groups));
    } catch (e) {}
  }, [groups]);

  // Save selected group to localStorage
  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem("pocket-notes-selected-group", JSON.stringify(selectedGroup));
    }
  }, [selectedGroup]);

  // Load notes for selected group
  useEffect(() => {
    if (selectedGroup) {
      const key = `notes-${selectedGroup.initials}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setNotes(parsed);
            return;
          }
        } catch (e) {}
      }
      setNotes([]);
    } else {
      setNotes([]);
    }
  }, [selectedGroup]);

  // Add new group to the list
  const handleCreateGroup = (groupName, selectedColor) => {
    const initials = getInitials(groupName);
    const newGroup = { name: groupName, color: selectedColor, initials };
    setGroups(prev => [...prev, newGroup]);
    setSelectedGroup(newGroup); // auto-select new group
    setModalOpen(false);
  };

  // Select a group from sidebar
  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  // Add note for selected group
  const handleAddNote = (note) => {
    if (!selectedGroup) return;
    const key = `notes-${selectedGroup.initials}`;
    const newNotes = [...notes, note];
    setNotes(newNotes);
    localStorage.setItem(key, JSON.stringify(newNotes));
  };

  const handleAddGroupClick = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="app-container">
      <div className="sidebar">
        <Sidebar 
          onAddGroupClick={handleAddGroupClick} 
          groups={groups} 
          selectedGroup={selectedGroup}
          onSelectGroup={handleSelectGroup}
        />
      </div>
      <div className="main-content">
        <div className="main-content-inner">
          {selectedGroup ? (
            <>
              <Header group={selectedGroup} />
              <NotesList notes={notes} group={selectedGroup} />
              <Footer onAddNote={handleAddNote} disabled={!selectedGroup} />
            </>
          ) : (
            <Welcome />
          )}
        </div>
      </div>
      <div>
        <CreateGroupModal
          open={modalOpen}
          onClose={handleCloseModal}
          onCreate={handleCreateGroup}
          colors={GROUP_COLORS}
        />
      </div>
    </div>
  );
}

export default App;



          