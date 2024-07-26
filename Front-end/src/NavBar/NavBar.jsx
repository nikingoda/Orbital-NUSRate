import { useNavigate } from "react-router-dom";
import navbarStyles from "./NavBar.module.css";
import { useEffect, useState } from "react";

const url = "https://orbital-nusrate.onrender.com";
const devurl = "http://localhost:8080";
const NavBar = () => {
  const [error, setError] = useState(null);
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const verifyToken = async () => {
    try {
      const loginInfo = localStorage.getItem("loginInfo");
      const res = await fetch(url + "/user", {
        method: "GET",
        headers: {
          "x-access-token": JSON.parse(loginInfo).loginToken,
        },
      });
      if (res.status === 200) {
        console.log("ok");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    verifyToken()
      .then((s) => {
        setState(s);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  });

  if (!state) {
    return (
      <div className={navbarStyles.navbar}>
        <div>
          <h1 className={`${navbarStyles.logo} ${navbarStyles.NUS}`}>NUS</h1>
          <h1 className={`${navbarStyles.logo} ${navbarStyles.Rate}`}>Rate</h1>
        </div>
        <ul>
          <li>
            <a href="/">
              <strong>HOME</strong>
            </a>
          </li>
          <li>
            <a href="/about">
              <strong>ABOUT</strong>
            </a>
          </li>
          <li>
            <a href="/contact">
              <strong>CONTACT</strong>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a className={navbarStyles.reglog} href="/register">
              <strong>REGISTER</strong>
            </a>
          </li>
          <li>
            <a className={navbarStyles.reglog} href="/login">
              <strong>LOGIN</strong>
            </a>
          </li>
        </ul>
      </div>
    );
  } else {
    const logOut = async (event) => {
      event.preventDefault();
      try {
        localStorage.removeItem("loginInfo");
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <div className={navbarStyles.navbar}>
        <div>
          <h1 className={`${navbarStyles.logo} ${navbarStyles.NUS}`}>NUS</h1>
          <h1 className={`${navbarStyles.logo} ${navbarStyles.Rate}`}>Rate</h1>
        </div>
        <ul>
          <li>
            <a href="/">
              <strong>HOME</strong>
            </a>
          </li>
          <li>
            <a href="/about">
              <strong>ABOUT</strong>
            </a>
          </li>
          <li>
            <a href="/plan">
              <strong>PLAN</strong>
            </a>
          </li>
          <li>
            <a href="/contact">
              <strong>CONTACT</strong>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/account">
              <strong>ACCOUNT</strong>
            </a>
          </li>
          <li onClick={logOut}>
            <a className={navbarStyles.reglog} href="/login">
              <strong>LOG OUT</strong>
            </a>
          </li>
        </ul>
      </div>
    );
  }
};

export default NavBar;
