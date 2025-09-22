// import React from "react";

// export default function Navbar({ logout }) {
//   return (
//     <div className="navbar">
//       <h1>Task Manager</h1>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }

import React, { useState } from "react";

export default function Navbar({ logout }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className="navbar">
      <h1>Task Manager</h1>
      <div>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
