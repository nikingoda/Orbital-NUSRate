import  { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Component from "./Component/Component"
import Footer from "./Footer/Footer";
import homepageStyles from "./HomePage.module.css";

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
      {/* <div className={homepageStyles.main}>
        {courses.map((course, index) => (
          <Component key={index} course={course} />
        ))}
      </div> */}
      <Footer />
    </div>
  );
};

export default HomePage;
