import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from "./components_template/navigation";
import { Header } from "./components_template/header";
import { Features } from "./components_template/features";
import { About } from "./components_template/about";
import { Services as TemplateServices } from "./components_template/services"; // Renamed to avoid conflict
import { Testimonials } from "./components_template/testimonials";
import { Team } from "./components_template/Team";
import { Contact } from "./components_template/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import "./index.css"; // Ensure index.css is also imported

// Existing components and pages
import ProductCard from './components/ProductCard';
import PersonalAssist from './pages/PersonalAssist';
import LeadGenerator from './pages/LeadGenerator';
import HrAgent from './pages/HrAgent';
import Services from './pages/Services';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const products = [
  {
    name: 'Personal Assistant Agent',
    description: 'Automate personal tasks and workflows.',
    link: '/personal-assist'
  },
  {
    name: 'Lead Generator',
    description: 'Generate and follow up on leads automatically.',
    link: '/lead-generator'
  },
  {
    name: 'Human Resources Agent',
    description: 'Streamline HR processes and employee management.',
    link: '/hr-agent'
  }
];

function ProductGallery() { // Renamed to avoid conflict with template's Gallery
  return (
    <div>
      <h1>Our Products</h1>
      <div className="gallery">
        {products.map(product => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </div>
  );
}

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <div>
        <Navigation />
        <Header data={landingPageData.Header} />
        <Features data={landingPageData.Features} />
        <About data={landingPageData.About} />
        <TemplateServices data={landingPageData.Services} />
        <Testimonials data={landingPageData.Testimonials} />
        <Team data={landingPageData.Team} />
        <Contact data={landingPageData.Contact} />

        <Routes>
          <Route path="/" element={<ProductGallery />} /> {/* Display your product gallery on the home page */}
          <Route path="/personal-assist" element={<PersonalAssist />} />
          <Route path="/lead-generator" element={<LeadGenerator />} />
          <Route path="/hr-agent" element={<HrAgent />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
