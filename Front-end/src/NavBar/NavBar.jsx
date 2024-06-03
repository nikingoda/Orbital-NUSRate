import "./NavBar.css";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
    const navigate = useNavigate();
    const verifyToken = () => {
        const currentTime = new Date().getTime() / 1000;
        const token = localStorage.getItem('token');
        if (!token) return false;
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (currentTime > payload.exp) {
          localStorage.removeItem("token");
          return false;
        }
        return true;
    }
    if(!verifyToken()) {
        return (
            <div className="all-navbar">
              <nav className="navbar">
                <h1 className="logo NUS">NUS</h1>
                <h1 className="logo Rate">Rate</h1>
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Courses</a>
                  </li>
                  <li>
                    <a href="#">Professors</a>
                  </li>
                  <li>
                    <a className="reg-log" href="/register">
                      Register
                    </a>
                  </li>
                  <li>
                    <a className="reg-log" href="/login">
                      Login
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          );
    } else {
        const logOut = async(event) => {
            event.preventDefault();
            try {
                localStorage.removeItem("token");
                navigate('/login');
            } catch (err) {
                console.log(err);
            }
        }
        return (
            <div className="all-navbar">
              <nav className="navbar">
                <h1 className="logo NUS">NUS</h1>
                <h1 className="logo Rate">Rate</h1>
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Courses</a>
                  </li>
                  <li>
                    <a href="#">Professors</a>
                  </li>
                  <li onClick={logOut}>
                    <a className="reg-log" href="/login">
                      Logout
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          );
    }
    
};

export default NavBar;