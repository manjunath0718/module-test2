import React from "react";
import "../styles/MainContent.css";
import illustration from "../assets/illustration.png"; 

function MainContent() {
  return (
    <>
      <div className="main-content-wrapper">
        <div className="main-illustration">
          <img
            src={illustration}
            alt="People with notebook illustration"
            className="main-illustration-img"
          />
        </div>
        <h2 className="main-title">Pocket Notes</h2>
        <p className="main-subtext">
          Send and receive messages without keeping your phone online.<br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>
      <div className="main-footer">
        <span className="lock-icon" aria-label="lock" role="img">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="8" rx="2" fill="#222" />
            <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
        <span className="footer-text">end-to-end encrypted</span>
      </div>
    </>
  );
}

export default MainContent;