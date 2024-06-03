

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>About Us</h3>
            <p>
            </p>
          </div>
          <div className="col-md-6">
            <h3>Contact Us</h3>
            <ul>
              <li>Email: </li>
              <li>Phone: </li>
              <li>Address: </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="text-center">
                &copy; {new Date().getFullYear()} Ca Mot Doi Liem Khiet. All Rights
                Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
