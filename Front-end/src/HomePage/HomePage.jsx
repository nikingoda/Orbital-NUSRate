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
  const [customPage, setCustomPage] = useState("");
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

  const paginate = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(filteredCourses.length / coursesPerPage)
    ) {
      setCurrentPage(pageNumber);
      setCustomPage(""); 
    }
  };

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const getPagination = () => {
    const paginationArray = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        paginationArray.push(i);
      }
    } else {
      if (currentPage <= 4) {
        paginationArray.push(1, 2, 3, 4, 5, "input", totalPages);
      } else if (currentPage >= totalPages - 3) {
        paginationArray.push(
          1,
          "input",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        paginationArray.push(
          1,
          "input",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "input",
          totalPages
        );
      }
    }
    return paginationArray;
  };

  const handleCustomPageChange = (event) => {
    setCustomPage(event.target.value);
  };

  const handleCustomPageSubmit = (event) => {
    event.preventDefault();
    paginate(Number(customPage));
  };

  return (
    <div className={homepageStyles.container}>
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
        {getPagination().map((page, index) => (
          <span key={index}>
            {page === "input" ? (
              <form
                onSubmit={handleCustomPageSubmit}
                className={homepageStyles.pageform}
              >
                <input
                  type="number"
                  value={customPage}
                  onChange={handleCustomPageChange}
                  className={homepageStyles.pageinput}
                  placeholder="Page"
                  min="1"
                  max={totalPages}
                />
                <button type="submit" className={homepageStyles.pagebutton}>
                  Go
                </button>
              </form>
            ) : (
              <button
                onClick={() => paginate(page)}
                className={homepageStyles.pagebutton}
                disabled={currentPage === page}
              >
                {page}
              </button>
            )}
          </span>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
