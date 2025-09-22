// // src/pages/components/TaskList.jsx
// import React from "react";

// export default function TaskList({ tasks, fetchTasks }) {
//   const token = localStorage.getItem("token");

//   const toggleComplete = async (id, completed) => {
//     try {
//       await fetch(`http://localhost:5000/api/tasks/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ completed: !completed }),
//       });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await fetch(`http://localhost:5000/api/tasks/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="task-list">
//       {tasks.map((task) => (
//         <div key={task._id} className={`task-item ${task.completed ? "completed" : ""}`}>
//           <h3>{task.title}</h3>
//           <p>{task.description}</p>
//           <div>
//             <button onClick={() => toggleComplete(task._id, task.completed)}>
//               {task.completed ? "Undo" : "Complete"}
//             </button>
//             <button onClick={() => deleteTask(task._id)}>Delete</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// src/pages/components/TaskList.jsx
// import React from "react";

// export default function TaskList({ tasks, fetchTasks, role }) {
//   const token = localStorage.getItem("token");

//   const toggleComplete = async (task) => {
//     try {
//       await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ completed: !task.completed }),
//       });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteTask = async (task) => {
//     try {
//       await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="task-list">
//       {tasks.length === 0 ? (
//         <p>No tasks yet.</p>
//       ) : (
//         tasks.map((task) => (
//           <div
//             key={task._id}
//             className={`task-card ${task.completed ? "completed" : ""}`}
//           >
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//             <p>
//               Assigned to: {task.assignedTo?.email || "Unassigned"} | Created by:{" "}
//               {task.createdBy?.email || "Unknown"}
//             </p>

//             <div className="task-actions">
//               {/* User can only complete their own tasks */}
//               {role === "user" && task.assignedTo?._id === task.assignedTo?._id && !task.completed && (
//                 <button onClick={() => toggleComplete(task)}>Mark Complete</button>
//               )}

//               {/* Manager can complete/edit/delete tasks they created */}
//               {role === "manager" && (
//                 <>
//                   {!task.completed && (
//                     <button onClick={() => toggleComplete(task)}>
//                       {task.completed ? "Undo" : "Complete"}
//                     </button>
//                   )}
//                   <button onClick={() => deleteTask(task)}>Delete</button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


// import React from "react";

// export default function TaskList({ tasks, fetchTasks, role, currentUserId }) {
//   const token = localStorage.getItem("token");

//   const toggleComplete = async (task) => {
//     try {
//       await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ completed: !task.completed }),
//       });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteTask = async (task) => {
//     try {
//       await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="task-list">
//       {tasks.length === 0 ? (
//         <p>No tasks yet.</p>
//       ) : (
//         tasks.map((task) => (
//           <div
//             key={task._id}
//             className={`task-card ${task.completed ? "completed" : ""}`}
//           >
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//             <p>
//               Assigned to: {task.assignedTo?.email || "Unassigned"} | Created by:{" "}
//               {task.createdBy?.email || "Unknown"}
//             </p>

//             <div className="task-actions">
//               {/* User can only complete tasks assigned to them */}
//               {role === "user" && task.assignedTo?._id === currentUserId && !task.completed && (
//                 <button onClick={() => toggleComplete(task)}>Mark Complete</button>
//               )}

//               {/* Manager can complete/delete any task */}
//               {role === "manager" && (
//                 <>
//                   <button onClick={() => toggleComplete(task)}>
//                     {task.completed ? "Undo" : "Complete"}
//                   </button>
//                   <button onClick={() => deleteTask(task)}>Delete</button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import React from "react";

export default function TaskList({ tasks, fetchTasks, role, currentUserId }) {
  const token = localStorage.getItem("token");

  // Toggle task completion
  const toggleComplete = async (task) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (!res.ok) {
        const err = await res.json();
        return alert(err.msg || "Failed to update task");
      }

      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  // Delete task
  const deleteTask = async (task) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        return alert(err.msg || "Failed to delete task");
      }

      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className={`task-card ${task.completed ? "completed" : ""}`}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              Assigned to: {task.assignedTo?.email || "Unassigned"} | Created by:{" "}
              {task.createdBy?.email || "Unknown"}
            </p>

            <div className="task-actions">
              {/* User can only complete tasks assigned to them */}
              {role === "user" &&
                task.assignedTo?._id.toString() === currentUserId.toString() && 
                !task.completed && (
                  <button onClick={() => toggleComplete(task)}>Mark Complete</button>
              )}

              {/* Manager can complete or delete any task */}
              {role === "manager" && (
                <>
                  <button onClick={() => toggleComplete(task)}>
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button onClick={() => deleteTask(task)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
