// import React from "react";
import { useState } from "react";
import registerformStyles from "./RegisterForm.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function RegisterForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordAgain, setPasswordAgain] = useState();
  const url = "https://orbital-nusrate.onrender.com/api/auth/signup";
  const devurl = "http://localhost:8080/api/auth/signup";
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          passwordAgain,
        }),
      });

      const data = await res.json();
      if (res.status === 201) {
        window.alert("Register successfully! Please login again!");
        navigate("/login");
      } else {
        window.alert(data.message);
      }
    } catch (error) {
      throw new Error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };
  return (
    <div className={registerformStyles.container}>
      <NavBar/>
      <div className={registerformStyles.wrapper}>
        <form action="">
          <h1>REGISTER</h1>
          <div className={registerformStyles.inputbox}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className={registerformStyles.icon} />
          </div>
          <div className={registerformStyles.inputbox}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className={registerformStyles.icon} />
          </div>
          <div className={registerformStyles.inputbox}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className={registerformStyles.icon} />
          </div>
          <div className={registerformStyles.inputbox}>
            <input
              type="password"
              placeholder="Password Again"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
              required
            />
            <FaLock className={registerformStyles.icon} />
          </div>
          <div className={registerformStyles.registerlink}>
            <p>
              You already had an account? <a href="/login">Log In</a>
            </p>
          </div>
          <button
            className={registerformStyles.submit}
            id="signup"
            onClick={handleClick}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
