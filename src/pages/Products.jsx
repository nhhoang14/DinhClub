import '../css/Products.css';
import banner from '../images/overall.jpg';
import ProductCard from '../components/ProductCard';
import bedao from '../images/bedao.jpg';
import bemai from '../images/bemai.jpg';
import bequat from '../images/bequat.jpg';
import bety from '../images/bety.jpg';
import begung from '../images/begung.jpg';
import belong from '../images/belong.jpg';
import betung from '../images/betung.jpg';
import bena from '../images/bena.jpg';
import bethong from '../images/bethong.jpg';
import bevy from '../images/bevy.jpg';

function Products() {
  const ProductCards = [
    { id: 1, image: bedao, title: "BÉ ĐÀO", type: "Keychain", price: "150.000" },
    { id: 2, image: bemai, title: "BÉ MAI", type: "Keychain", price: "150.000" },
    { id: 3, image: bequat, title: "BÉ QUÁT", type: "Keychain", price: "150.000" },
    { id: 4, image: bety, title: "BÉ TY", type: "Keychain", price: "150.000" },
    { id: 5, image: begung, title: "BÉ GỪNG", type: "Keychain", price: "145.000" },
    { id: 6, image: belong, title: "BÉ LONG", type: "Keychain", price: "145.000" },
    { id: 7, image: betung, title: "BÉ TÙNG", type: "Keychain", price: "145.000" },
    { id: 8, image: bena, title: "BÉ NA", type: "Keychain", price: "145.000" },
    { id: 9, image: bethong, title: "BÉ THÔNG", type: "Keychain", price: "145.000" },
    { id: 10, image: bevy, title: "BÉ VY", type: "Keychain", price: "145.000" }
  ];

  return (
    <div className="products">
      <div className="product-banner">
        <img src={banner} alt="Product Banner" />
      </div>
      <div className="product-content">
        <div className="product-nav">
          <p className="product-all">
            ALL PRODUCTS
          </p>
          <p className="product-keychains">
            KEYCHAIN
          </p>
          <p className="product-stickers">
            STICKER
          </p>
        </div>
        <div className="product-list">
          {ProductCards.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              type={product.type}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;

