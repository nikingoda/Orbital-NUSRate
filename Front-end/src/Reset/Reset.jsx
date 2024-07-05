import React, { useState } from "react";
import resetStyles from "./Reset.module.css";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const url = "https://orbital-nusrate.onrender.com/api/auth/reset";

const Reset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setSuccessMessage("Password reset successful!");
        navigate("/login");
      } else {
        setError("Password reset failed! " + data.message);
      }
    } catch (error) {
      throw new Error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return (
    <div className={resetStyles.container}>
      <NavBar />
      <div className={resetStyles.wrapper}>
        <form onSubmit={handleSubmit}>
          <h1>RESET PASSWORD</h1>
          <div className={resetStyles.inputbox}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaLock className={resetStyles.icon} />
          </div>
          <div className={resetStyles.inputbox}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className={resetStyles.icon} />
          </div>
          <div className={resetStyles.inputbox}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FaLock className={resetStyles.icon} />
          </div>
          <button type="submit">Reset Password</button>
          {error && <p className={resetStyles.errorMessage}>{error}</p>}
          {successMessage && (
            <p className={resetStyles.successMessage}>{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Reset;
