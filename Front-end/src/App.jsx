import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import HomePage from "./HomePage/HomePage";
// import Footer from "./HomePage/Footer/Footer";
import RatePage from "./RatePage/RatePage";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path = "/register" element = {<RegisterForm />}></Route>
        <Route path= "/login" element = {<LoginForm />}></Route>
        <Route path = "/" element = {<HomePage/>}></Route>
        <Route path = "/rate/:courseCode/:courseName" element = {<RatePage/>}></Route> 
      </Routes>
    </>
  );
}

export default App;
