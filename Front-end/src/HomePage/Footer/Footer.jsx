import footerStyles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <div className={footerStyles.row}>
          <div className={footerStyles["col-md-6"]}>
            <h3>About Us</h3>
            <p></p>
          </div>
          <div className={footerStyles["col-md-6"]}>
            <h3>Contact Us</h3>
            <ul>
              <li>Email: </li>
              <li>Phone: </li>
              <li>Address: </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={footerStyles["footer-bottom"]}>
        <div className={footerStyles.container}>
          <div className={footerStyles.row}>
            <div
              className={`${footerStyles["col-md-12"]} ${footerStyles["text-center"]}`}
            >
              <p>
                &copy; {new Date().getFullYear()} Ca Mot Doi Liem Khiet. All
                Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
