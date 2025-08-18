import "../Footer.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import text from "../assets/Home.png";

import MiniMap2 from "./Map2";
export default function Footer() {
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  const joinus = () => {
    navigate("/joinus");
  };
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
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Support</a>
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
