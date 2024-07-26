import React from "react";
import intropageStyles from "./IntroPage.module.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../HomePage/Footer/Footer";

const IntroPage = () => {
  return (
    <div className={intropageStyles.pageContainer}>
      <NavBar />
      <div className={intropageStyles.contentContainer}>
        <div className={intropageStyles.content}>
          <h1 className={intropageStyles.title}>
            <strong>Welcome to NUSRate !</strong>
          </h1>
          <p className={intropageStyles.description}>
            {" "}
            to Read | to Review | to find Track{" "}
          </p>
          <div className={intropageStyles.coursesContainer}>
            <div className={intropageStyles.course}>
              EE4205 Quantum Communication and Cryptography
            </div>
            <div className={intropageStyles.course}>
              CS3230 Design and Analysis of Algorithms
            </div>
            <div className={intropageStyles.course}>
              ST2334 Probability and Statistics
            </div>
            <div className={intropageStyles.course}>
              ES1103 English for Academic Purposes
            </div>
            <div className={intropageStyles.course}>
              ACC2706 Managerial Accounting
            </div>
            <div className={intropageStyles.course}>
              PS2266 Politics, Music, and Society
            </div>
            <div className={intropageStyles.course}>
              EC2104 Quantitative Methods for Economic Analysis
            </div>
            <div className={intropageStyles.course}>
              QF1100 Introduction to Quantitative Finance
            </div>
            <div className={intropageStyles.course}>
              EE3305/ME3243 Robotic System Design
            </div>
            <div className={intropageStyles.course}>
              FSC2101 Forensic Science
            </div>
            <div className={intropageStyles.course}>
              BN5210 Biosensors and Biochips
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IntroPage;
