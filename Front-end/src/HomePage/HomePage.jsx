import "./HomePage.css";
import Component from "./Component/Component";
import Footer from "./Footer/Footer";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

const urlCourses = "http://localhost:8080/api/course";

const HomePage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(urlCourses);
        setCourses(response.data);
      } catch (error) {
        console.log("Error fetching courses", error);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="main">
        {courses.map((course, index) => (
          <Component key={index} course={course} />
        ))}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
