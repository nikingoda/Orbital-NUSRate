import footerStyles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} Ca Mot Doi Liem Khiet. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
