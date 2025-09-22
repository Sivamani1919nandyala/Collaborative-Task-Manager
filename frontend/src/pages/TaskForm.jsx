// // src/pages/components/TaskForm.jsx
// import React, { useState } from "react";

// export default function TaskForm({ fetchTasks }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) return window.location.href = "/login";

//     try {
//       const res = await fetch("http://localhost:5000/api/tasks", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title, description }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         alert(data.message || "Failed to create task");
//         return;
//       }

//       setTitle("");
//       setDescription("");
//       fetchTasks(); // refresh task list
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <form className="task-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Task title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button type="submit">Add Task</button>
//     </form>
//   );
// }

// src/pages/components/TaskForm.jsx
// import React, { useState, useEffect } from "react";

// export default function TaskForm({ fetchTasks }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [assignedTo, setAssignedTo] = useState("");
//   const [users, setUsers] = useState([]);
//   const token = localStorage.getItem("token");

//   // Fetch all users (so manager can assign)
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/auth/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         setUsers(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !assignedTo) return alert("Title and Assigned To are required");

//     try {
//       const res = await fetch("http://localhost:5000/api/tasks", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title, description, assignedTo }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         alert(data.message || "Failed to create task");
//         return;
//       }
//       setTitle("");
//       setDescription("");
//       setAssignedTo("");
//       fetchTasks(); // refresh task list
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <form className="task-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Task title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <select
//         value={assignedTo}
//         onChange={(e) => setAssignedTo(e.target.value)}
//         required
//       >
//         <option value="">Assign to user</option>
//         {users.map((user) => (
//           <option key={user._id} value={user._id}>
//             {user.email} ({user.role})
//           </option>
//         ))}
//       </select>
//       <button type="submit">Add Task</button>
//     </form>
//   );
// }


import React, { useState, useEffect } from "react";

export default function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch all users (so manager can assign tasks)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !assignedTo) return alert("Title and Assigned To are required");

    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, assignedTo }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to create task");
        return;
      }
      setTitle("");
      setDescription("");
      setAssignedTo("");
      fetchTasks(); // Refresh task list
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        required
      >
        <option value="">Assign to user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.email} ({user.role})
          </option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
