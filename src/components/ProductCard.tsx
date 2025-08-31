import '../css/ProductCard.css';
import { useState } from 'react';
import Product from '../models/Product';

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

function ProductCard({ product, onOpen }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(product.image);

  return (
    <div className="product-item"
      onMouseEnter={() => setCurrentImage(product.hoverImage || product.image)}
      onMouseLeave={() => setCurrentImage(product.image)}
    >
      <img src={currentImage}
        className="product-image"
        onClick={() => onOpen(product)}
        alt={product.name}
      />
      <div className="product-info">
        <p className="product-title" onClick={() => onOpen(product)}>{product.name}</p>
        <p className="product-price">{product.price} VND</p>
        <p className="product-type">{product.type}</p>
      </div>
    </div>
  );
}

export default ProductCard;