import Contact from "./components/Contact";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';


import Contact2 from "./components/Contact2";

import { useRef } from "react";
import What from "./components/What";

import Segment1 from "./components/WhatWeDo";



import Carousel from "./components/Carousel";
import News from "./components/News";


import Aboutus from "./components/Aboutus";









function App() {
const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

   const handleScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
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
        <Route path="/joinus" element={<Contact2 />} />
      

        <Route path="/What" element={<What/>}/>
        
           <Route path="/whyus" element={<Segment1/>}/>
               
                  
     
          
          < Route path="/aboutus"  element={<Aboutus/>} />
            <Route path="/products" element={<Carousel />} />
             <Route path="/whatsnext" element={<News />} />
                   
                     
            
                     
                    
          
   
   
  
       
    
    
     
     
      </Routes>
    </Router>
 
  );
}

export default App;
