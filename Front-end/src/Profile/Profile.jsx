import { useState } from "react";
import styles from "./Profile.module.css"; 
import { useParams } from "react-router-dom";


const url = "http://localhost:8080";
const Profile = () => {
  const [profileImgSrc, setProfileImgSrc] = useState(
    "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
  );
  const [profile, setProfile] = useState(null);
  const { username } = useParams();

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
    document.body.classList.toggle(styles.themeAlternate); 
  };

  const fetchProfile = async (url, username) => {
    try {
      const response = await fetch(
        `${url}/api/profile?username=${username}`,
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
          setUser(data);
        } else {
          console.log("No user data found");
        }
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
        setError(error);
      });
  }, [url, username]);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>User Profile</h1>
      </div>
      <div className={styles.profileBody}>
        <div className={styles.profileLeft}>
          <div className={styles.profilePicture}>
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
              className={styles.uploadBtn}
              onClick={() => document.getElementById("avatar-upload").click()}
            >
              Set Avatar
            </button>
          </div>
          <div className={styles.profileDetails}>
            <h2>John Doe</h2>
            <p>
              <strong>Username:</strong> johndoe123
            </p>
            <p>
              <strong>Email:</strong> johndoe@example.com
            </p>
            <p>
              <strong>Participation Date:</strong> January 1, 2020
            </p>
          </div>
          <div className={styles.profileActions}>
            <button className={styles.resetPassword}>Reset Password</button>
            <button
              id="theme-switch"
              className={styles.themeSwitch}
              onClick={toggleTheme}
            >
              Switch Theme
            </button>
          </div>
        </div>
        <div className={styles.profileRight}>
          <div className={styles.profileReviews}>
            <h3>Review History</h3>
            <ul>
              <li>
                Review 1: Excellent course! Highly recommended.
                <div className={styles.ratingBar} data-rating="5"></div>
              </li>
              <li>
                Review 2: The instructor was very knowledgeable.
                <div className={styles.ratingBar} data-rating="4"></div>
              </li>
              <li>
                Review 3: Great content but could be more interactive.
                <div className={styles.ratingBar} data-rating="3"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
