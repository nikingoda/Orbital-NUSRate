import { useState } from "react";
import loginformStyles from "./LoginForm.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:8080/api/auth/signin";
function LoginForm() {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState();
  const [password, setPassword] = useState();
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameOrEmail,
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({
            userID: data.id,
            loginToken: data.accessToken,
          })
        );
        window.alert("Login successfully");
        navigate("/");
      } else {
        window.alert("Login failed! " + data.message);
      }
    } catch (error) {
      throw new Error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return (
    <div className={loginformStyles.wrapper}>
      <form action="">
        <h1>LOGIN</h1>
        <div className={loginformStyles.inputbox}>
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
          <FaUser className={loginformStyles.icon} />
        </div>
        <div className={loginformStyles.inputbox}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className={loginformStyles.icon} />
        </div>

        <div className={loginformStyles.rememberme}>
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit" id="login" onClick={handleClick}>
          Login
        </button>
        <div className={loginformStyles.registerlink}>
          <p>
            Do not have an account? <a href="/register">Register</a>
          </p>
        </div>
      </form>
      <script></script>
    </div>
  );
}

export default LoginForm;
