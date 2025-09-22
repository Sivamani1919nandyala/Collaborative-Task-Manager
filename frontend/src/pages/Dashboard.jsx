// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import "../styles/dashboard.css";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);
  
//   const fetchTasks = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch("http://localhost:5000/api/tasks", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setTasks(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <>
//       <Navbar logout={logout} />
//       <div className="dashboard-container">
//         <h2>Your Tasks</h2>
//         <div className="tasks-container">
//           {tasks.map((task) => (
//             <div className="task-card" key={task._id}>
//               <h3>{task.title}</h3>
//               <p>{task.description}</p>
//               <button className="complete">Complete</button>
//               <button className="edit">Edit</button>
//               <button className="delete">Delete</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }


// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [role, setRole] = useState(""); // 'user' or 'manager'
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       window.location.href = "/login";
//     } else {
//       fetchUserRole();
//       fetchTasks();
//     }
//   }, []);

//   const fetchUserRole = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setRole(data.role);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/tasks", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setTasks(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   const handleCreateTask = async (e) => {
//     e.preventDefault();
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
//       if (res.ok) {
//         setTasks((prev) => [...prev, data]);
//         setTitle("");
//         setDescription("");
//       } else alert(data.message);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleComplete = async (taskId) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ completed: true }),
//       });
//       if (res.ok) fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (taskId) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <Navbar logout={handleLogout} />
//       <div className="dashboard-container">
//         <h2>Welcome, {role}</h2>

//         {/* Create Task Form for Managers */}
//         {role === "manager" && (
//           <form onSubmit={handleCreateTask} className="task-form">
//             <input
//               type="text"
//               placeholder="Task Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Task Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//             <button type="submit">Create Task</button>
//           </form>
//         )}

//         {/* Task List */}
//         <div className="task-list">
//           {tasks.length === 0 ? (
//             <p>No tasks yet.</p>
//           ) : (
//             tasks.map((task) => (
//               <div
//                 key={task._id}
//                 className={`task-card ${task.completed ? "completed" : ""}`}
//               >
//                 <h3>{task.title}</h3>
//                 <p>{task.description}</p>
//                 <p>Assigned to: {task.assignedTo?.email || "Unassigned"}</p>
//                 <div className="task-actions">
//                   {!task.completed && (
//                     <button onClick={() => handleComplete(task._id)}>
//                       Mark Complete
//                     </button>
//                   )}
//                   <button onClick={() => handleDelete(task._id)}>Delete</button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import TaskForm from "../components/TaskForm";
// import TaskList from "../components/TaskList";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [role, setRole] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       window.location.href = "/login";
//       return;
//     }
//     fetchUserRole();
//     fetchTasks();
//   }, []);

//   // Fetch logged-in user's role
//   const fetchUserRole = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setRole(data.role);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Fetch tasks for user or manager
//   const fetchTasks = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/tasks", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setTasks(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   return (
//     <>
//       <Navbar logout={handleLogout} />
//       <div className="dashboard-container">
//         <h2>Welcome, {role}</h2>

//         {/* Task creation for managers only */}
//         {role === "manager" && <TaskForm fetchTasks={fetchTasks} />}

//         {/* Task list for both managers and users */}
//         <TaskList tasks={tasks} fetchTasks={fetchTasks} role={role} />
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../pages/TaskForm";
import TaskList from "../pages/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [role, setRole] = useState("");
  const [currentUserId, setCurrentUserId] = useState(""); // Store logged-in user's ID
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchUserRole();
    fetchTasks();
  }, []);

  // Fetch logged-in user's role and ID
  const fetchUserRole = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRole(data.role);
      setCurrentUserId(data._id);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch tasks for user or manager
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar logout={handleLogout} />
      <div className="dashboard-container">
        <h2>Welcome, {role}</h2>

        {/* Task creation for managers only */}
        {role === "manager" && <TaskForm fetchTasks={fetchTasks} />}

        {/* Task list for both managers and users */}
        <TaskList tasks={tasks} fetchTasks={fetchTasks} role={role} currentUserId={currentUserId} />
      </div>
    </>
  );
}
