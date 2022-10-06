import React from "react";

import Menu from "./Menu";

import "./TopNav.css";

export default function TopNav() {
  return (
    <div className="top-nav">
      <h1>
        <strong>no</strong>todo <i className="fa-solid fa-badge-check"></i>
      </h1>
      <Menu />
    </div>
  );
}
