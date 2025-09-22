// // import React, { useState } from "react";

// // export default function Signup() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch("http://localhost:5000/api/auth/register", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //       });
// //       const data = await res.json();
// //       console.log(data);
// //       alert("Signup successful!");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Signup failed!");
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <h2>Signup</h2>
// //       <form onSubmit={handleSubmit}>
// //         <label>Email</label>
// //         <input
// //           type="email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //         <label>Password</label>
// //         <input
// //           type="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //         <button type="submit">Signup</button>
// //       </form>
// //     </div>
// //   );
// // }


// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import "../styles/auth.css";

// // export default function Signup() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     // try {
// //     //   const res = await fetch("http://localhost:5000/api/auth/register", {
// //     //     method: "POST",
// //     //     headers: { "Content-Type": "application/json" },
// //     //     body: JSON.stringify({ email, password }),
// //     //   });
// //     //   const data = await res.json();
// //     //   if (res.ok) {
// //     //     // ✅ Save JWT token and redirect to dashboard
// //     //     localStorage.setItem("token", data.token);
// //     //     window.location.href = "/dashboard";
// //     //   } else {
// //     //     alert(data.message || "Signup failed");
// //     //   }
// //     // } catch (err) {
// //     //   console.error(err);
// //     //   alert("Signup failed!");
// //     // }
// //      try {
// //       const res = await fetch("http://localhost:5000/api/auth/register", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await res.json();

// //       if (res.ok) {
// //         // ✅ Save JWT token and redirect to dashboard
// //         localStorage.setItem("token", data.token);
// //         window.location.href = "/dashboard";
// //       } else {
// //         alert(data.message || "Signup failed");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("Something went wrong!");
// //     }
// //   };

// //   return (
// //     <div className="auth-container">
// //       <h2>Signup</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //         <button type="submit">Signup</button>
// //       </form>
// //       <div className="auth-footer">
// //         Already have an account? <Link to="/login">Login</Link>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/auth.css";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         alert(errData.message || "Signup failed");
//         return;
//       }

//       const data = await res.json();

//       // ✅ Save JWT token and redirect
//       localStorage.setItem("token", data.token);
//       window.location.href = "/dashboard";
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Signup</button>
//       </form>
//       <p className="auth-footer">
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

export default function Signup() {
  const [username, setUsername] = useState(""); // ✅ added
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }), // ✅ send username
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.message || "Signup failed");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <p className="auth-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
