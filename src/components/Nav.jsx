import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../Nav.css";
import { GiHamburgerMenu } from "react-icons/gi"; // Menu icon

const Nav = ({
  onScrollToSection1,
  onScrollToSection2,
  onScrollToSection3,
  onScrollToSection4,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Detect Firefox
  const isFirefox = typeof InstallTrigger !== "undefined";

  return (
    <div className="responsive-navbar">
      <div className="menu-toggle" onClick={toggleMenu}>
        <GiHamburgerMenu size={30} color="#e3d9b5" />
      </div>

      <Row className={`nav ${menuOpen ? "nav-open" : ""}`}>
        {/* Conditionally render About Us */}
        {!isFirefox && (
          <Link to="/aboutus" className="btn-12">
            ABOUT US
          </Link>
        )}
        <button className="btn-12" onClick={onScrollToSection1}>
          SERVICES
        </button>
        <button className="btn-12" onClick={onScrollToSection2}>
          WHY US
        </button>

        <Link to="/products" className="btn-12">
          PRODUCTS
        </Link>

        <button className="btn-12" onClick={onScrollToSection3}>
          CERTIFICATIONS
        </button>

        <Link to="/contact" className="btn-12">
          CONTACT
        </Link>
      </Row>
    </div>
  );
};

export default Nav;
