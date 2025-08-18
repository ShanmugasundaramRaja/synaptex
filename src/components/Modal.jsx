import React from "react";
import "../Modal.css";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="fancy">
          {" "}
          <h2>THANK YOU</h2>
          <p>YOU WILL HEAR FROM US IN THE NEXT 48 HOURS.</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
