import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import HomePage from "./HomePage/HomePage";
import RatePage from "./RatePage/RatePage";
import { Route, Routes, Navigate } from "react-router-dom";
import IntroPage from "./IntroPage/IntroPage";
import Profile from "./Profile/Profile";

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
        <Route path = "/profile/:username" element = {<Profile/>}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
