import React from "react";
import "../styles/Sidebar.css";

function Sidebar({ onAddGroupClick, groups, selectedGroup, onSelectGroup }){
    return(
        <div className="sidebar-content">
            <h1 className="sidebar-title">Pocket Notes</h1>
            <div className="sidebar-group-list">
                {groups.map((group, idx) => (
                    <div 
                        key={idx} 
                        className={`sidebar-group-item${selectedGroup && selectedGroup.name === group.name ? " selected" : ""}`}
                        onClick={() => onSelectGroup(group)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="sidebar-group-color">
                          <span className="sidebar-group-initials" style={{ background: group.color }}>
                            {group.initials}
                          </span>
                        </span>
                        <span className="sidebar-group-name">{group.name}</span>
                    </div>
                ))}
            </div>
            <button
                className="sidebar-add-btn"
                aria-label="Add group"
                onClick={onAddGroupClick}
            >
                +
            </button>
        </div>
    );
}

export default Sidebar;