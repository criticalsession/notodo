import React, { useState, useRef, useEffect } from "react";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const listenForOutsideClicks = () => {
      if (listening) return;
      if (!menuRef.current) return;
      setListening(true);
      [`click`, `touchstart`].forEach((type) => {
        document.addEventListener(type, (evt) => {
          if (menuRef.current.contains(evt.target)) return;
          setMenuOpen(false);
        });
      });
    };

    listenForOutsideClicks();
  });

  return (
    <div className="menu-container" ref={menuRef}>
      <i
        className={`fa-solid fa-bars open-menu ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      ></i>
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <i className="fa-solid fa-user"></i> Critical Session
          </li>
          <hr />
          <li>
            <i className="fa-solid fa-right-from-bracket"></i> Sign Out
          </li>
        </ul>
      </div>
    </div>
  );
}
