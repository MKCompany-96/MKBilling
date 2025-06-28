import React, { useState } from "react";

function Header({ onSearch }) {
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => setShowSettings(!showSettings);

  const handleSearch = () => {
    const id = document.getElementById("searchInput").value.trim();
    if (id) onSearch(id);
    else alert("Enter a Bill ID to search.");
  };

  return (
    <header>
      <div className="logo">
        <img src="/logo.jpg" alt="MK Logo" />
      </div>
      <div className="search-bar">
        <input type="text" id="searchInput" placeholder="Search Bill ID..." />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="icons">
        <span>👤</span>
        <span onClick={toggleSettings}>⚙️</span>
        {showSettings && (
          <div className="dropdown-content">
            <button onClick={() => alert("Edit mode coming soon!")}>Edit Bill</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
