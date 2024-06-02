import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import HomePage from "./HomePage/HomePage";
// import NavBar from "./NavBar/NavBar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path = "/register" element = {<RegisterForm />}></Route>
        <Route path= "/login" element = {<LoginForm />}></Route>
        <Route path = "/" element = {<HomePage/>}></Route>
        {/* <Route path = "/" element = {<NavBar />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
