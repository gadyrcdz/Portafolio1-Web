// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AcademicWorks from './pages/AcademicWorks';
import PersonalInfo from './pages/PersonalInfo';
import Recommendations from './pages/Recommendations';
import CustomSection1 from './pages/CustomSection1';
import CustomSection2 from './pages/CustomSection2';
import CustomSection3 from './pages/CustomSection3';
import personalData from './data/personal-info.json';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>{personalData.basicInfo.name} - Portafolio</title>
          <meta name="description" content={personalData.basicInfo.bio} />
          <script type="application/ld+json">
            {JSON.stringify(personalData.jsonLD)}
          </script>
        </Helmet>
        
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/academic-works" element={<AcademicWorks />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/blog" element={<CustomSection1 />} />
            <Route path="/projects" element={<CustomSection2 />} />
            <Route path="/hobbies" element={<CustomSection3 />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;