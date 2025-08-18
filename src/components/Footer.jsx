import "../Footer.css";

import text from "../assets/Home.png";

import MiniMap2 from "./Map2";
export default function Footer() {
  return (
    <>
      <footer className="custom-footer">
        <div className="footer-row">
          <div className="footer-col image-col">
            <img src={text} alt="Logo" />
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Services</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li>
                <a>Blog</a>
              </li>
              <li>
                <a>Privacy Policy</a>
              </li>
              <li>
                <a>Terms</a>
              </li>
              <li>
                <a>Support</a>
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
