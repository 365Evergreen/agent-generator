import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ name, description, link }) {
  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <Link to={link}>View Demo</Link>
    </div>
  );
}

export default ProductCard;