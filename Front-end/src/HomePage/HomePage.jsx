import "./HomePage.css";
import Component from "./Component/Component";
import NavBar from "../NavBar/NavBar";


const HomePage = () => {

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
};

export default HomePage;
