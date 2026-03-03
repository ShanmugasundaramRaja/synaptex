import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
          <button className="btn-12" onClick={() => navigate("/aboutus")}>
            ABOUT US
          </button>
        )}
        <button className="btn-12" onClick={onScrollToSection1}>
          SERVICES
        </button>
        <button className="btn-12" onClick={onScrollToSection2}>
          WHY US
        </button>

        <button className="btn-12" onClick={() => navigate("/products")}>
          PRODUCTS
        </button>

        <button className="btn-12" onClick={onScrollToSection3}>
          CERTIFICATIONS
        </button>

        <button onClick={() => navigate("/contact")} className="btn-12">
          CONTACT
        </button>
      </Row>
    </div>
  );
};

export default Nav;
