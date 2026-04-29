import Contact from "./components/Contact";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { useRef } from "react";
import AboutUs from "./components/AboutUs";
import Product from "./components/Product";

function App() {
const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

const handleScroll = (ref) => {
  const top = ref.current?.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: 'smooth' });
};
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Landing 
        onScrollToSection1={() => handleScroll(section1Ref)}
        onScrollToSection2={() => handleScroll(section2Ref)}
        onScrollToSection3={() => handleScroll(section3Ref)}
        onScrollToSection4={() => handleScroll(section4Ref)}
        section1Ref ={section1Ref }
        section2Ref={section2Ref}
        section3Ref={section3Ref}
         section4Ref={section4Ref}
        
        />} />
        <Route path="/contact" element={<Contact />} />

       
                <Route path="/aboutus" element={<AboutUs/>}/>
                <Route path="/products" element={<Product />} />
      </Routes>
    </Router>
  
 
  );
}

export default App;
