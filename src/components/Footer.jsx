import "../Footer.css";
import { Link } from "react-router-dom";

import MiniMap2 from "./Map2";
export default function Footer() {
  return (
    <>
      <footer className="custom-footer">
        <div className="footer-row">
          <div className="footer-col image-col">
            <img src="newsassets/img/Home.png" alt="Logo" loading="lazy" />
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/whyus">Services</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li>
                <p className="footp">Blog</p>
              </li>
              <li>
                <p className="footp">Privacy Policy</p>
              </li>
              <li>
                <p className="footp">Terms</p>
              </li>
              <li>
                <p className="footp">Support</p>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Address</h4>
            <p>
              Richard Kuhn Strasse 5 Heidelberg, Germany 69123
              info@synaptexglobal.com
            </p>
          </div>
          <div className="footer-col map-col">
            <MiniMap2 />
          </div>
        </div>
      </footer>

      {/* Footer */}
    </>
  );
}
