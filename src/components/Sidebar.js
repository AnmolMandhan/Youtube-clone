import React, { useState } from "react";
import {
  FaHome,
  FaMusic,
  FaGamepad,
  FaLaptopCode,
  FaNewspaper,
  FaBook,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./sidebar.css";

const categories = [
  { name: "All", icon: <FaHome /> },
  { name: "Music", icon: <FaMusic /> },
  { name: "Gaming", icon: <FaGamepad /> },
  { name: "Tech", icon: <FaLaptopCode /> },
  { name: "News", icon: <FaNewspaper /> },
  { name: "Education", icon: <FaBook /> },
];

export default function Sidebar({ category, setCategory }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={() => setCollapsed((c) => !c)}>
        {collapsed ? <FaBars /> : <FaTimes />}
      </button>

      {categories.map((c) => (
        <button
          key={c.name}
          className={`cat-btn ${c.name === category ? "active" : ""}`}
          onClick={() => setCategory(c.name)}
          title={c.name}
        >
          <span className="icon">{c.icon}</span>
          {!collapsed && <span className="label">{c.name}</span>}
        </button>
      ))}
    </aside>
  );
}
