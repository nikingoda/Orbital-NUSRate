import React, { useState, useEffect } from "react";
import planStyles from "./Plan.module.css";
import coursesData from "./trackcourse.json"

const Plan = () => {
  const [major, setMajor] = useState("");
  const [track, setTrack] = useState("");
  const [results, setResults] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (major) {
      const selectedMajor = coursesData.majors.find(m => m.name === major);
      if (selectedMajor) {
        setTracks(selectedMajor.tracks);
        setTrack(""); 
        setResults([]);
      }
    } else {
      setTracks([]);
      setResults([]);
    }
  }, [major]);

  const handleMajorChange = (e) => {
    setMajor(e.target.value);
  };

  const handleTrackChange = (e) => {
    setTrack(e.target.value);
  };

  const handleSearch = () => {
    const selectedMajor = coursesData.majors.find(m => m.name === major);
    const selectedTrack = selectedMajor?.tracks.find(t => t.name === track);
    const filteredCourses = selectedTrack ? selectedTrack.courses : [];
    setResults(filteredCourses);
  };

  return (
    <div className={planStyles.searchpage}>
      <h1>
        <strong>Find Your Track</strong>
      </h1>
      <div className={planStyles.searchoptions}>
        <div className={planStyles.searchoption}>
          <label htmlFor="major">Major:</label>
          <select id="major" value={major} onChange={handleMajorChange}>
            <option value="">Select Major</option>
            {coursesData.majors.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
        <div className={planStyles.searchoption}>
          <label htmlFor="track">Track:</label>
          <select
            id="track"
            value={track}
            onChange={handleTrackChange}
            disabled={!major}
          >
            <option value="">Select Track</option>
            {tracks.map((trackOption) => (
              <option key={trackOption.name} value={trackOption.name}>
                {trackOption.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSearch} className={planStyles.searchbutton}>
          Search
        </button>
      </div>
      <div className={planStyles.results}>
        {results.map((result) => (
          <div key={result.id} className={planStyles.resultitem}>
            {result.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan;
