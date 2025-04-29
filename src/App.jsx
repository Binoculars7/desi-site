import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Portfolio from "./Portfolio";
import UploadPortfolio from "./UploadPortfolio";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/upload" element={<UploadPortfolio />} />
        
      </Routes>
    </Router>
  );




  
};


export default App;
