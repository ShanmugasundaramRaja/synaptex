import "../Footer.css";
import { Link } from "react-router-dom";
import Logo from "../assets/Home.png";
import MiniMap2 from "./Map2";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Footer() {
  const [iconSize, setIconSize] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setIconSize(20);
      } else {
        setIconSize(30);
      }
    };

    // Run once on mount
    handleResize();

    // Listen for resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <footer className="custom-footer">
        <div className="footer-row">
          <div className="footer-col image-col">
            <img src={Logo} alt="Logo" loading="lazy" />
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
              <br />
              info@synaptexglobal.com
            </p>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/synaptex_global?igsh=M2RjZmwzdWFzbWEx&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "1vw" }}
              >
                <FaInstagram size={iconSize} />
              </a>
              <a
                href="https://www.linkedin.com/company/108337837/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={iconSize} />
              </a>
            </div>
          </div>

          <div className="footer-col map-col">
            <MiniMap2 />
          </div>
        </div>
      </footer>
    </>
  );
}
