import { useState, useEffect, lazy, Suspense } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../Contact.css";

import { useNavigate } from "react-router-dom";

// Lazy-load non-critical components
const Modal = lazy(() => import("./Modal"));
const Contactloader = lazy(() => import("./Contactloader"));

export default function Contact() {
  const [hovering, setHovering] = useState(false);

  const [loading, setLoading] = useState(() => {
    const hasLoaded = sessionStorage.getItem("contactLoaderShown");
    return hasLoaded ? false : true;
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("contactLoaderShown", "true");
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sending) return;
    setSending(true);

    try {
      // Load EmailJS only when needed (big perf win)
      const { default: emailjs } = await import("@emailjs/browser");

      await emailjs.send(
        "service_yf53jlk",
        "template_v3vk4bo",
        formData,
        "6Lfq3ESdTbQaoftN5",
      );

      setModalOpen(true);
    } catch (err) {
      console.error("FAILED...", err);
      setModalOpen(true);
    } finally {
      setSending(false);
    }
  };

  const handleClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <Suspense fallback={null}>
        <Contactloader />
      </Suspense>
    );
  }

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
                    autoComplete="given-name"
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
                    autoComplete="family-name"
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
                    autoComplete="email"
                    inputMode="email"
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
                    autoComplete="organization"
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
                  disabled={sending}
                >
                  <h1>{sending ? "SENDING..." : "SUBMIT"}</h1>
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

          <Suspense fallback={null}>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
          </Suspense>
        </Col>
      </Row>
    </Container>
  );
}
