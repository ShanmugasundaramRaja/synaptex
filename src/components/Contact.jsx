import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "./Modal";
import "../Contact.css";
import emailjs from "@emailjs/browser";

import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [hovering, setHovering] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    emailjs
      .send(
        "service_yf53jlk", // Replace with your EmailJS service ID
        "template_v3vk4bo", // Replace with your EmailJS template ID
        formData, // This object must match template variables
        "6Lfq3ESdTbQaoftN5" // Replace with your EmailJS public key
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setModalOpen(true);
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setModalOpen(true);
      });

    // Add validation or send data to API here
  };

  const handleClick = () => {
    navigate("/");
    window.scrollTo(0, 0); // Scroll to top immediately after navigation
  };
  return (
    <Container fluid className={`body ${hovering ? "hovered" : ""}`}>
      <Row className="contactrow">
        <Col>
          <div className="masking-container">
            <h1 className="masked-text">
              WE ARE <br />
              LISTENING
            </h1>
          </div>
        </Col>
        <Col>
          <div className="box">
            <div className={hovering ? "text2" : "text"}>CONTACT US</div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="input-data">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <div className="underline"></div>
                  <label>First Name</label>
                </div>

                <div className="input-data">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <div className="underline"></div>
                  <label>Last Name</label>
                </div>
              </div>

              <div className="form-row">
                <div className="input-data">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <div className="underline"></div>
                  <label>Email</label>
                </div>
                <div className="input-data">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <div className="underline"></div>
                  <label>Company</label>
                </div>
              </div>

              <div className="form-row">
                <div className="input-data textarea">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <div className="underline"></div>
                  <label>Write your message</label>
                </div>
              </div>

              <div className="button-wrapper">
                <button
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  className="button-78"
                  type="submit"
                >
                  <h1>SUBMIT</h1>
                </button>

                <button
                  type="button"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  onClick={handleClick}
                  className="button-78"
                >
                  <h1>BACK</h1>
                </button>
              </div>
            </form>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          ></Modal>
        </Col>
      </Row>
    </Container>
  );
}
