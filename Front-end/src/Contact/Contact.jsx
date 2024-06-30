import contactStyles from "./Contact.module.css";
import NavBar from "../NavBar/NavBar";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "c5bf1f91-cdab-46a4-a0d0-16c8bd4662c5");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };
  return (
    <section className={contactStyles.general}>
      <NavBar />
      <form onSubmit={onSubmit} className={contactStyles.formcontact}>
        <h2>CONTACT FORM</h2>
        <div className={contactStyles.inputbox}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className={contactStyles.field}
            placeholder="Enter your username"
            name="name"
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
            name="email"
            required
          />
        </div>
        <div className={contactStyles.inputbox}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            className={`${contactStyles.field} ${contactStyles.mess}`}
            placeholder="Enter your message"
            name="message"
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
