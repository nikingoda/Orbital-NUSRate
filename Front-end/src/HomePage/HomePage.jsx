import "./HomePage.css";
import Component from "./Component/Component";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";


const HomePage = () => {
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

  if(verifyToken()) {
    return (
      <div>
        <NavBar/>
        <div className="main">
        {/* <div className="search">
        <SearchBar />
        </div> */}
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </div>
      </div>
      
    );
  } else {
    navigate('/login');
  }
};

export default HomePage;
