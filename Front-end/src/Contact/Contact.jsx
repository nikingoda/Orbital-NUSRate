import contactStyles from "./Contact.module.css";
import NavBar from "../NavBar/NavBar";

const Contact = () => {
  return (
    <section className={contactStyles.general}>
      <NavBar/>
      <form className={contactStyles.formcontact}>
        <h2>CONTACT FORM</h2>
        <div className={contactStyles.inputbox}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className={contactStyles.field}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className={contactStyles.inputbox}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className={contactStyles.field}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className={contactStyles.inputbox}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            className={`${contactStyles.field} ${contactStyles.mess}`}
            placeholder="Enter your message"
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
