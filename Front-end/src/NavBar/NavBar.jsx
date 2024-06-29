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
          <a href="/" className={navbarStyles.navlink}>
            Home
          </a>
        </li>
        <li>
          <a href="#" className={navbarStyles.navlink}>
            About
          </a>
        </li>
        <li>
          <a href="#" className={navbarStyles.navlink}>
            Rate
          </a>
        </li>
        <li>
          <a href="#" className={navbarStyles.navlink}>
            Contact
          </a>
        </li>
        {!verifyToken() ? (
          <>
            <li>
              <a
                href="/register"
                className={`${navbarStyles.navlink} ${navbarStyles.reglog}`}
              >
                Register
              </a>
            </li>
            <li>
              <a
                href="/login"
                className={`${navbarStyles.navlink} ${navbarStyles.reglog}`}
              >
                Login
              </a>
            </li>
          </>
        ) : (
          <li onClick={logOut}>
            <a
              href="/login"
              className={`${navbarStyles.navlink} ${navbarStyles.reglog}`}
            >
              Logout
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
