import '../css/ProductsPage.css';
import { useState } from 'react';
import { sortProducts } from '../hooks/sortHelpers';
import banner from '../images/overall.jpg';
import ProductCard from '../components/ProductCard';
import Product from '../models/Product';

interface ProductsPageProps {
  products: Product[];
  onOpen: (product: Product) => void;
}

function ProductsPage({ products, onOpen }: ProductsPageProps) {
  const [selectedType, setSelectedType] = useState<string>("All");
  const filteredProducts = selectedType === "All"
    ? products
    : products.filter(product => product.type === selectedType);
  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div className="products">
      <div className="product-banner">
        <img src={banner} alt="Product Banner" />
      </div>
      <div className="product-content">
        <div className="product-nav">
          <p className={`product-all ${selectedType === "All" ? "active" : "not-active"}`}
            onClick={() => setSelectedType("All")}>
            <span className="active-btn">ALL PRODUCTS</span>
          </p>
          <p className={`product-keychains ${selectedType === "Keychain" ? "active" : "not-active"}`}
            onClick={() => setSelectedType("Keychain")}>
            <span className="active-btn">KEYCHAIN</span>
          </p>
          <p className={`product-stickers ${selectedType === "Sticker" ? "active" : "not-active"}`}
            onClick={() => setSelectedType("Sticker")}>
            <span className="active-btn">STICKER</span>
          </p>
        </div>
        <div className="product-list">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;

