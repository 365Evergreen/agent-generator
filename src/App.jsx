import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import PersonalAssist from './pages/PersonalAssist';
import LeadGenerator from './pages/LeadGenerator';
import HrAgent from './pages/HrAgent';
import Services from './pages/Services';

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

function Gallery() {
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/personal-assist" element={<PersonalAssist />} />
        <Route path="/lead-generator" element={<LeadGenerator />} />
        <Route path="/hr-agent" element={<HrAgent />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;