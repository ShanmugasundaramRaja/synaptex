import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Contact2.css";
import { db, storage } from "../firebase"; // adjust path as needed
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { RiUploadCloudFill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Contact2 = () => {
  const [step, setStep] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlehome = () => {
    navigate("/");
  };
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [files, setFiles] = useState({});
  useEffect(() => {
    console.log("Current files:", files);
  }, [files]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("formData");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const [direction, setDirection] = useState(0);

  const nextStep = (e) => {
    e.preventDefault();
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = (e) => {
    e.preventDefault();
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const fieldsetVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
      scale: 0.95,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      scale: 0.95,
      transition: { duration: 0.6, ease: "easeInOut" },
    }),
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const steps = [
    {
      title: "Company Introduction",

      content: (
        <>
          <label>
            <h3>Name of your Company</h3>{" "}
          </label>
          <textarea
            name="q0"
            placeholder="Answer"
            value={formData.q0 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Location of your Company</h3>{" "}
          </label>
          <textarea
            name="q1"
            placeholder="Answer"
            value={formData.q1 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Upload Company Profile</h3>
          </label>
          <label htmlFor="companyProfile" className="custom-file-upload">
            <RiUploadCloudFill size={30} />
          </label>
          <input
            type="file"
            id="companyProfile"
            name="companyProfile"
            className="hidden-file-input"
            onChange={(e) => {
              const file = e.target.files[0];
              setFiles((prev) => ({ ...prev, companyProfile: file }));
            }}
          />

          <label>
            <h3>Company's Annual Turnover (INR, EUR or USD)</h3>{" "}
          </label>
          <textarea
            name="q2"
            placeholder="Answer"
            value={formData.q2 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Number of Employees (Factory & Office)</h3>
          </label>
          <textarea
            name="q3"
            placeholder="Answer"
            value={formData.q3 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Monthly Production Capacity (Units or Value)</h3>
          </label>
          <textarea
            name="q4"
            placeholder="Answer"
            value={formData.q4 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Key machinery and Infrastructure(In-House)</h3>
          </label>

          <textarea
            name="q5"
            placeholder="Answer"
            value={formData.q5 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Processes Outsourced and it's Infrastructure</h3>
          </label>

          <textarea
            name="q6"
            placeholder="Answer"
            value={formData.q6 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Exported countries</h3>
          </label>
          <textarea
            name="q7"
            placeholder="Answer"
            value={formData.q7 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Key Notable Clients ( If not Confidential)</h3>
          </label>
          <textarea
            name="q8"
            placeholder="Answer"
            value={formData.q8 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>List all Product Categories you offer</h3>
          </label>
          <textarea
            name="q9"
            placeholder="Answer"
            value={formData.q9 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Do you have in-house design and r&d teams</h3>
          </label>
          <textarea
            name="q10"
            placeholder="Answer"
            value={formData.q10 || ""}
            onChange={handleInputChange}
          />
        </>
      ),
    },
    {
      title: "PRODUCTION OVERVIEW",

      content: (
        <>
          <label>
            <h3>UPLOAD YOUR product catalog</h3>
          </label>
          <label htmlFor="companyProfile" className="custom-file-upload">
            <RiUploadCloudFill size={30} />
          </label>
          <input
            type="file"
            id="companyProfile"
            name="productCatalog"
            className="hidden-file-input"
            onChange={(e) => {
              const file = e.target.files[0];
              setFiles((prev) => ({ ...prev, productCatalog: file }));
            }}
          />

          <label>
            <h3>lead time for sample and order</h3>
          </label>
          <textarea
            name="q11"
            placeholder="Answer"
            value={formData.q11 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>sampling free or chargeable</h3>
          </label>
          <textarea
            name="q12"
            placeholder="Answer"
            value={formData.q12 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>do you prefer tech-pack or physical samples</h3>
          </label>
          <textarea
            name="q13"
            placeholder="Answer"
            value={formData.q13 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>do you provide lab-dips or strike-offs before production</h3>
          </label>
          <textarea
            name="q14"
            placeholder="Answer"
            value={formData.q14 || ""}
            onChange={handleInputChange}
          />
        </>
      ),
    },
    {
      title: "LOGISTICS",

      content: (
        <>
          <label>
            <h3>LEAD TIME FOR REPEAT ORDERS</h3>
          </label>
          <textarea
            name="q15"
            placeholder="Answer"
            value={formData.q15 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>MOQ per product/color/design</h3>
          </label>
          <textarea
            name="q16"
            placeholder="Answer"
            value={formData.q16 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Can you consolidate multiple SKUs into a single shipment</h3>
          </label>
          <textarea
            name="q17"
            placeholder="Answer"
            value={formData.q17 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Do you support urgent orders or flexible delivery schedules</h3>
          </label>
          <textarea
            name="q18"
            placeholder="Answer"
            value={formData.q18 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>preferred shipping term (FOB, CIF, DDP)</h3>
          </label>
          <textarea
            name="q19"
            placeholder="Answer"
            value={formData.q19 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>What port do you usually ship from</h3>
          </label>
          <textarea
            name="q20"
            placeholder="Answer"
            value={formData.q20 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>open to using the buyer’s nominated forwarder</h3>
          </label>
          <textarea
            name="q21"
            placeholder="Answer"
            value={formData.q21 || ""}
            onChange={handleInputChange}
          />
        </>
      ),
    },
    {
      title: "PRICING AND QUALITY CONTROL",

      content: (
        <>
          <label>
            <h3>Do you offer tiered pricing based on volume or order size</h3>
          </label>
          <textarea
            name="q22"
            placeholder="Answer"
            value={formData.q22 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>
              What are your payment terms? (e.g., T/T advance, L/C at sight,
              D/P)
            </h3>
          </label>
          <textarea
            name="q23"
            placeholder="Answer"
            value={formData.q23 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>
              Do you support secure payment platforms (e.g., PayPal, Escrow for
              small orders)
            </h3>
          </label>
          <textarea
            name="q24"
            placeholder="Answer"
            value={formData.q24 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>How long is your price validity</h3>
          </label>
          <textarea
            name="q25"
            placeholder="Answer"
            value={formData.q25 || ""}
            onChange={handleInputChange}
          />

          <label>
            <h3>
              Can you share your costing breakdown (fabric, labor, trims,
              overhead)
            </h3>
          </label>
          <textarea
            name="q26"
            placeholder="Answer"
            value={formData.q26 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>What is your current quality claim or rejection rate</h3>
          </label>
          <textarea
            name="q27"
            placeholder="Answer"
            value={formData.q27 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>
              How is your quality control process structured (e.g., in-line,
              end-line, AQL)
            </h3>
          </label>
          <textarea
            name="q28"
            placeholder="Answer"
            value={formData.q28 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>
              Are replacement or credit options available in case of defects
            </h3>
          </label>
          <textarea
            name="q29"
            placeholder="Answer"
            value={formData.q29 || ""}
            onChange={handleInputChange}
          />
        </>
      ),
    },
    {
      title: "OTHER INFORMATION",
      title2:
        "CERTIFICATION , PACKING , COMMUNICATION , DOCUMENTATION & OTHER INFORMATION",
      content: (
        <>
          <label>
            <h3>
              What certifications do you currently hold? (e.g., OEKO-TEX, GOTS)
            </h3>
          </label>
          <textarea
            name="q30"
            placeholder="Answer"
            value={formData.q30 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Do you have factory audit reports (BSCI, SEDEX)</h3>
          </label>
          <textarea
            name="q31"
            placeholder="Answer"
            value={formData.q31 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>
              Are your products compliant with country-specific import
              regulations (e.g., REACH)
            </h3>
          </label>
          <textarea
            name="q32"
            placeholder="Answer"
            value={formData.q32 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Are you open to third-party inspections (SGS, Intertek)</h3>
          </label>
          <textarea
            name="q33"
            placeholder="Answer"
            value={formData.q33 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>
              Do you support private label or buyer branding and wash care
              labelling
            </h3>
          </label>
          <textarea
            name="q34"
            placeholder="Answer"
            value={formData.q34 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>
              Can you pack in custom polybags, cartons, or retail-ready formats
            </h3>
          </label>
          <textarea
            name="q35"
            placeholder="Answer"
            value={formData.q35 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Your point of contact for coordination</h3>
          </label>
          <textarea
            name="q36"
            placeholder="Answer"
            value={formData.q36 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>your preferred mode of communication </h3>
          </label>
          <textarea
            name="q37"
            placeholder="Answer"
            value={formData.q37 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Can you provide production timelines frequent updates </h3>
          </label>
          <textarea
            name="q38"
            placeholder="Answer"
            value={formData.q38 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>
              Are you open to visiting the buyer’s office or hosting buyer
              visits to your factory
            </h3>
          </label>
          <textarea
            name="q39"
            placeholder="Answer"
            value={formData.q39 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>
              Do you provide complete shipping documents (invoice, packing list,
              CO, BL, etc.)
            </h3>
          </label>
          <textarea
            name="q40"
            placeholder="Answer"
            value={formData.q40 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Are you attending any trade fairs (e.g., Heimtextil)</h3>
          </label>
          <textarea
            name="q41"
            placeholder="Answer"
            value={formData.q41 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>
              Are you open to signing a non-disclosure agreement (NDA) for
              custom designs
            </h3>
          </label>
          <textarea
            name="q42"
            placeholder="Answer"
            value={formData.q42 || ""}
            onChange={handleInputChange}
          />
          <label>
            <h3>Do you maintain inventory for any fast-moving SKUs</h3>
          </label>
          <textarea
            name="q43"
            placeholder="Answer"
            value={formData.q43 || ""}
            onChange={handleInputChange}
          />
        </>
      ),
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredTextFields = Array.from({ length: 44 }, (_, i) => `q${i}`);
    const missingAnswers = requiredTextFields.filter(
      (key) => !formData[key]?.trim()
    );

    if (missingAnswers.length > 0) {
      alert("⚠️ Please fill out all required text answers before submitting.");
      return;
    }

    try {
      setLoading(true);

      // 1. Upload files to Firebase Storage and get URLs
      const fileUploadPromises = Object.entries(files).map(
        async ([key, file]) => {
          if (!file) return null;

          // Create a unique file path, e.g. `submissions/{timestamp}/{key}_${file.name}`
          const timestamp = Date.now();
          const storageRef = ref(
            storage,
            `submissions/${timestamp}/${key}_${file.name}`
          );

          // Upload file
          await uploadBytes(storageRef, file);

          // Get downloadable URL
          const downloadURL = await getDownloadURL(storageRef);

          return { key, url: downloadURL };
        }
      );

      const uploadedFiles = await Promise.all(fileUploadPromises);

      // 2. Prepare final data object
      const submissionData = {
        ...formData,
        files: {},
        submittedAt: new Date().toISOString(),
      };

      uploadedFiles.forEach((fileObj) => {
        if (fileObj) {
          submissionData.files[fileObj.key] = fileObj.url;
        }
      });

      // 3. Store form data + file URLs in Firestore
      // Use a new doc with auto-id in a "submissions" collection
      const submissionsCol = collection(db, "submissions");
      const newDocRef = doc(submissionsCol);

      await setDoc(newDocRef, submissionData);

      setModalOpen(true);

      // Optional: clear form + local storage
      setFormData({});
      setFiles({});
      localStorage.removeItem("formData");
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <img
        src="https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev/srcassets/Home%20(3).png"
        alt=""
        className="rotate-layer2"
        loading="lazy"
      />
      <div className="homebutrow">
        <GoHomeFill style={{ color: "beige" }} size={30} />
        <button className=" btn-12 " onClick={handlehome}>
          {" "}
          HOME
        </button>
      </div>

      <form id="msform" onSubmit={handleSubmit}>
        <ul id="progressbar">
          <li className={step >= 0 ? "active" : ""}></li>
          <li className={step >= 1 ? "active" : ""}></li>
          <li className={step >= 2 ? "active" : ""}></li>
          <li className={step >= 3 ? "active" : ""}></li>
          <li className={step >= 4 ? "active" : ""}></li>
        </ul>

        <AnimatePresence custom={direction} mode="wait">
          <motion.fieldset
            key={step}
            variants={fieldsetVariants}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h2 className="fs-title">{steps[step].title}</h2>
            <h3 className="fs-subtitle">{steps[step].title2}</h3>
            {steps[step].content}

            <div>
              {step > 0 && (
                <button
                  className="previous action-button button-88"
                  onClick={prevStep}
                >
                  PREVIOUS
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  className="next action-button button-88"
                  onClick={nextStep}
                >
                  NEXT
                </button>
              ) : (
                <button
                  className="submit action-button button-88"
                  disabled={loading}
                >
                  SUBMIT
                </button>
              )}
            </div>
          </motion.fieldset>
        </AnimatePresence>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}></Modal>
    </>
  );
};

export default Contact2;
