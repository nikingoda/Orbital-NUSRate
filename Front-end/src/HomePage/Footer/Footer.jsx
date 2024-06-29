import footerStyles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      {/* <div className={footerStyles.container}>
        <div className={footerStyles.row}>
          <div className={footerStyles["col-md-6"]}>
            <p>ABOUT US</p>
            <p></p>
          </div>
          <div className={footerStyles["col-md-6"]}>
            <h3>CONTACT US</h3>
            <ul>
              <li>EMAIL: </li>
              <li>PHONE: </li>
              <li>ADDRESS: </li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className={footerStyles.footerbottom}>
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
