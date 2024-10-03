import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

export const Backdrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};
