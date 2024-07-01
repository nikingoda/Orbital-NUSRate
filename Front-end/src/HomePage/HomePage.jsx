import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Component from "./Component/Component";
import Footer from "./Footer/Footer";
import homepageStyles from "./HomePage.module.css";

const urlCourses = "http://localhost:8080/api/course";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 15;

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

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <div>
      <NavBar />
      <div className={homepageStyles.main}>
        {currentCourses.map((course, index) => (
          <Component key={index} course={course} />
        ))}
      </div>
      <div className={homepageStyles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={homepageStyles.pagebutton}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
