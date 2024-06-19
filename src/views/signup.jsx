import React, { useState } from "react";
import "../public/login.css";
import axios from "axios";
// Signup component
function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSignup = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3000/auth/signup", {
          username,
          password,
        });
        // Assuming successful signup will return some data
        // You can also check for specific status codes in response
        if (response.data) {
          // Redirect to home page
          window.location.href="/Home"
          localStorage.setItem("user",username);
        } else {
          // Handle error case if needed
          console.error("Signup failed");
        }
      } catch (error) {
        console.error(error);
      }
    };


  return (
    <section id="section1">
      <div id="signup-sheet">
        <div id="img"></div>
        <h2
          style={{
            width: "700px",
            fontSize: "28px",
            fontWeight: "bold",
            borderBottom: "2px solid rgb(55, 54, 54)",
            position: "absolute",
            top: "100px",
            paddingBottom: "5px",
          }}
        >
          Signup
        </h2>
        <form
          onSubmit={handleSignup}
          method="post"
          style={{ position: "absolute", top: "160px" }}
        >
          {/* User name input */}
          <label>User name</label>
          <br />
          <input
            type="text"
            className="input"
            size="30"
            placeholder="What you would like to be called?"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          {/* Password input */}
          <label>Password</label> <br />
          <input
            type="password"
            className="input"
            size="30"
            name="password"
            placeholder="Set your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /> <br />
          {/* Signup button */}
          <button id="login-btn" type="submit">
            Signup
          </button>
        </form>
      </div>
    </section>
  );
}

// Export the Signup component
export default Signup;
