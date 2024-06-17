import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact">
      <form>
        <h2>Contact Form</h2>
        <div className="input-box">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="field"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="field"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            className="field mess"
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
