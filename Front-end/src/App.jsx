import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import HomePage from "./HomePage/HomePage";
import RatePage from "./RatePage/RatePage";
import { Route, Routes } from "react-router-dom";
import IntroPage from "./IntroPage/IntroPage";

import "./App.css";
import Contact from "./Contact/Contact";
import ReadPage from "./ReadPage/Readpage";

function App() {
  return (
    <>
      <Routes>
        <Route path = "/register" element = {<RegisterForm />}></Route>
        <Route path= "/login" element = {<LoginForm />}></Route>
        <Route path = "/" element = {<HomePage/>}></Route>
        <Route path = "/rate/:courseCode" element = {<RatePage/>}></Route> 
        <Route path = "/contact" element = {<Contact/>}></Route>
        <Route path = "/course/:courseCode" element = {<ReadPage/>}></Route>
        <Route path = "/about" element = {<IntroPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
