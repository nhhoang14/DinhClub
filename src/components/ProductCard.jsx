import '../css/ProductCard.css';
import { useState } from 'react';

function ProductCard({ image, hoverImage, title, type, price }) {
  const [currentImage, setCurrentImage] = useState(image);

  return (
    <div className="product-item"
      onMouseEnter={() => setCurrentImage(hoverImage || image)}
      onMouseLeave={() => setCurrentImage(image)}
    >
      <img src={currentImage} className="product-image" alt={title} />
      <div className="product-info">
        <p className="product-title">{title}</p>
        <p className="product-price">{price} VND</p>
        <p className="product-type">{type}</p>
      </div>
    </div>
  );
}

export default ProductCard;