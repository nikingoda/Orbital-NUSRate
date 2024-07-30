import { useState, useEffect } from "react";
import styles from "./Profile.module.css"; 
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const url = "https://orbital-nusrate.onrender.com";
const devurl = "http://localhost:8080";
const Profile = () => {
  const [profileImgSrc, setProfileImgSrc] = useState(
    "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
  );
  const [profile, setProfile] = useState(null);
  const [participationDate, setDate] = useState();
  var { username } = useParams();

  if(!username) {
    username = JSON.parse(localStorage.getItem("loginInfo")).username;
  }

  if(!username) {
    window.alert("please login again");
    useNavigate()("/");
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]; 

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImgSrc(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const toggleTheme = () => {
    document.body.classList.toggle(styles.themealternate); 
  };

  const fetchProfile = async (url, username) => {
    try {
      const response = await fetch(
        `${url}/profile?username=${username}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("User found!");
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch user:" + response.statusText);
        return undefined;
      }
    } catch (err) {
      console.error(
        "There was an error with the fetch operation:" + error.message
      );
      return undefined;
    }
  }

  useEffect(() => {
    fetchProfile(url, username)
      .then((data) => {
        if (data) {
          console.log("User data:", data);
          setProfile(data);
          console.log(profile);
          setDate(data.participationDate);
        } else {
          console.log("No user data found");
        }
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
      });
  }, [url, username]);

  return (
    <div className={styles.profilecontainer}>
      <NavBar/>
      <div className={styles.profileheader}>
        <h1>User Profile</h1>
      </div>
      <div className={styles.profilebody}>
        <div className={styles.profileleft}>
          <div className={styles.profilepicture}>
            <img
              id="profile-img"
              src={profileImgSrc}
              alt="Default Profile Picture"
            />
          </div>
          <div>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarUpload}
            />
            <button
              id="set-avatar"
              className={styles.uploadbtn}
              onClick={() => document.getElementById("avatar-upload").click()}
            >
              Set Avatar
            </button>
          </div>
          <div className={styles.profiledetails}>
            <h2>{username}</h2>
            <p>
              <strong>Username:</strong> {username}
            </p>
            <p>
              <strong>Participation Date:</strong> {new Date(participationDate).toLocaleDateString()}
            </p>
          </div>
          <div className={styles.profilreactions}>
            {/* <button className={styles.resetpassword}>Reset Password</button> */}
            <button
              id="theme-switch"
              className={styles.themeswitch}
              onClick={toggleTheme}
            >
              Switch Theme
            </button>
          </div>
        </div>
        {/* <div className={styles.profileright}>
          <div className={styles.profilereviews}>
            <h3>Review History</h3>
            <ul>
              <li>
                Review 1: Excellent course! Highly recommended.
                <div className={styles.ratingbar} data-rating="5"></div>
              </li>
              <li>
                Review 2: The instructor was very knowledgeable.
                <div className={styles.ratingbar} data-rating="4"></div>
              </li>
              <li>
                Review 3: Great content but could be more interactive.
                <div className={styles.ratingbar} data-rating="3"></div>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
