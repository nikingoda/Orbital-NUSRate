import { useNavigate } from "react-router-dom";
import navbarStyles from "./NavBar.module.css";

const NavBar = () => {
  const navigate = useNavigate();
  const verifyToken = () => {
    const currentTime = new Date().getTime() / 1000;
    const loginInfo = localStorage.getItem("loginInfo");
    if (!loginInfo) return false;
    const token = JSON.parse(loginInfo).loginToken;
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (currentTime > payload.exp) {
      localStorage.removeItem("loginInfo");
      return false;
    }
    return true;
  };
  if (!verifyToken()) {
    return (
      <div className={navbarStyles.navbar}>
        <div>
          <h1 className={`${navbarStyles.logo} ${navbarStyles.NUS}`}>NUS</h1>
          <h1 className={`${navbarStyles.logo} ${navbarStyles.Rate}`}>Rate</h1>
        </div>
        <ul>
          <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="#">ABOUT</a>
          </li>
          <li>
            <a href="#">RATE</a>
          </li>
          <li>
            <a href="#">CONTACT</a>
          </li>
        </ul>
        <ul>
          <li>
            <a className={navbarStyles.reglog} href="/register">
              REGISTER
            </a>
          </li>
          <li>
            <a className={navbarStyles.reglog} href="/login">
              LOGIN
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
        <h1 className={`${navbarStyles.logo} ${navbarStyles.NUS}`}>NUS</h1>
        <h1 className={`${navbarStyles.logo} ${navbarStyles.Rate}`}>Rate</h1>
        <ul>
          <li>
            <a href="#">HOME</a>
          </li>
          <li>
            <a href="#">ABOUT</a>
          </li>
          <li>
            <a href="#">RATE</a>
          </li>
          <li>
            <a href="#">CONTACT</a>
          </li>
          <li onClick={logOut}>
            <a className={navbarStyles.reglog} href="/login">
              LOG OUT
            </a>
          </li>
        </ul>
      </div>
    );
  }
};

export default NavBar;
