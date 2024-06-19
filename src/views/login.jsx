import React, { useState} from "react";
import "../public/login.css";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invaildmsg,setinvaildmsg]=useState("none")

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/auth/index', {
            username,
            password
        });
       // Assuming successful signup will return some data
    // You can also check for specific status codes in response
    if (response.data) {
      // Redirect to home page
      window.location.href="/Home"
      localStorage.setItem("user",username);
    } else {
      // Handle error case if needed
      setinvaildmsg("inline");
    }
    } catch (error) {
      setinvaildmsg("inline");
    }
};

  return (
    <section id="section1" >
      <div id="login-sheet">
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
          Login
        </h2>
        <div id='invaildnote' style={{display:invaildmsg}}>Invaild Credentials</div>
        <form
          method="post"
          style={{ position: "absolute", top: "160px" }}
          onSubmit={handleLogin}
        >
          <label>Email</label>
          <br />
          <input
            type="text"
            className="input"
            size="30"
            placeholder="Your email"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <label>Password</label> <br />
          <input
            type="password"
            className="input"
            size="30"
            placeholder="Your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button id="login-btn" type="submit">
            Login
          </button>
          <a href="/signup" type="button" id="register-btn">
            Signup with email
          </a>
        </form>
      </div>
    </section>
  );
}

export default Login;
