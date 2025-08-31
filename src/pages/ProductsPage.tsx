import '../css/ProductsPage.css';
import { useState } from 'react';
import ProductModal from '../components/ProductModal';
import banner from '../images/overall.jpg';
import ProductCard from '../components/ProductCard';
import Product from '../models/Product';
import CartItem from '../models/CartItem';

interface ProductsPageProps {
  products: Product[];
  userCart: CartItem[];
  addToCart: (product: Product, qty: number) => void;
}

function ProductsPage({ products, userCart, addToCart }: ProductsPageProps) {
  const [selectedType, setSelectedType] = useState<string>("All");
  const filteredProducts = selectedType === "All"
    ? products
    : products.filter(product => product.type === selectedType);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={setSelectedProduct}
            />
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          isOpen={true}
          product={selectedProduct}
          userCart={userCart}
          addToCart={addToCart}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
}

export default ProductsPage;

