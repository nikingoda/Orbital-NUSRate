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
  const [searchQuery, setSearchQuery] = useState("");
  const coursesPerPage = 15;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(urlCourses);
        console.log(response.data);
        setCourses(response.data);
        console.log(courses);
      } catch (error) {
        console.log("Error fetching courses", error);
      }
    };
    fetchCourses();
  }, []);

  console.log(courses);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.moduleCode.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div>
      <NavBar />
      <div className={homepageStyles.search}>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={homepageStyles.searchinput}
        />
      </div>
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
