import '../css/Products.css';
import { useState } from 'react';
import ProductModal from '../components/ProductModal';
import banner from '../images/overall.jpg';
import ProductCard from '../components/ProductCard';
import bedao from '../images/bedao.jpg';
import bedao_hover from '../images/bedao_hover.jpg';
import bemai from '../images/bemai.jpg';
import bemai_hover from '../images/bemai_hover.jpg';
import bequat from '../images/bequat.jpg';
import bequat_hover from '../images/bequat_hover.jpg';
import bety from '../images/bety.jpg';
import bety_hover from '../images/bety_hover.jpg';
import begung from '../images/begung.jpg';
import belong from '../images/belong.jpg';
import betung from '../images/betung.jpg';
import bena from '../images/bena.jpg';
import bethong from '../images/bethong.jpg';
import bevy from '../images/bevy.jpg';
import summer_st from '../images/summer_st.jpg';
import xmas_st from '../images/xmas_st.jpg';
import ninhbo_st from '../images/ninhbo_st.jpg';
import vanphong_st from '../images/vanphong_st.jpg';
import dbblue_st from '../images/dbblue_st.jpg';
import chualanh_st from '../images/chualanh_st.jpg';
import dbblueblack_st from '../images/dbblueblack_st.jpg';
import vuive_st from '../images/vuive_st.jpg';
import dbblack_st from '../images/dbblack_st.jpg';

function Products() {
  const ProductCards = [
    { id: 1, image: bedao, hoverImage: bedao_hover, title: "BÉ ĐÀO", type: "Keychain", price: "150.000", color: "#FA6AA1" },
    { id: 2, image: bemai, hoverImage: bemai_hover, title: "BÉ MAI", type: "Keychain", price: "150.000", color: "#C4A8EF" },
    { id: 3, image: bequat, hoverImage: bequat_hover, title: "BÉ QUÁT", type: "Keychain", price: "150.000", color: "#228F4C" },
    { id: 4, image: bety, hoverImage: bety_hover, title: "BÉ TỴ", type: "Keychain", price: "150.000", color: "#FE8CE4" },
    { id: 5, image: begung, title: "BÉ GỪNG", type: "Keychain", price: "145.000", color: "#C8AE9D" },
    { id: 6, image: belong, title: "BÉ LONG", type: "Keychain", price: "145.000", color: "#D3031B" },
    { id: 7, image: betung, title: "BÉ TÙNG", type: "Keychain", price: "145.000", color: "#BEC6B1" },
    { id: 8, image: bena, title: "BÉ NA", type: "Keychain", price: "145.000", color: "#D81925" },
    { id: 9, image: bethong, title: "BÉ THÔNG", type: "Keychain", price: "145.000", color: "#385455" },
    { id: 10, image: bevy, title: "BÉ VY", type: "Keychain", price: "145.000", color: "#D6021B" },
    { id: 11, image: summer_st, title: "HÈ TUYỆT ĐỐI", type: "Sticker", price: "39.000" },
    { id: 12, image: xmas_st, title: "GIÁNG SINH AN GIẤC", type: "Sticker", price: "39.000" },
    { id: 13, image: ninhbo_st, title: "DÍNH NỊNH BỢ", type: "Sticker", price: "59.000" },
    { id: 14, image: chualanh_st, title: "DÍNH CHỮA LÀNH", type: "Sticker", price: "59.000" },
    { id: 15, image: vuive_st, title: "DÍNH VUI V(Ẻ)", type: "Sticker", price: "59.000" },
    { id: 16, image: dbblue_st, title: "DÍNH BLUE", type: "Sticker", price: "59.000" },
    { id: 17, image: vanphong_st, title: "DÍNH VĂN PHÒNG", type: "Sticker", price: "59.000" },
    { id: 18, image: dbblack_st, title: "DÍNH BLACK", type: "Sticker", price: "59.000" },
    { id: 19, image: dbblueblack_st, title: "DÍNH BLUE BLACK", type: "Sticker", price: "59.000" },
  ];

  const [selectedType, setSelectedType] = useState("All");
  const filteredProducts = selectedType === "All"
    ? ProductCards
    : ProductCards.filter(product => product.type === selectedType);

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="products">
      <div className="product-banner">
        <img src={banner} alt="Product Banner" />
      </div>
      <div className="product-content">
        <div className="product-nav">
          <p className={`product-all ${selectedType === "All" ? "active" : ""}`}
            onClick={() => setSelectedType("All")}>
            ALL PRODUCTS
          </p>
          <p className={`product-keychains ${selectedType === "Keychain" ? "active" : ""}`}
            onClick={() => setSelectedType("Keychain")}>
            KEYCHAIN
          </p>
          <p className={`product-stickers ${selectedType === "Sticker" ? "active" : ""}`}
            onClick={() => setSelectedType("Sticker")}>
            STICKER
          </p>
        </div>
        <div className="product-list">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              hoverImage={product.hoverImage}
              title={product.title}
              type={product.type}
              price={product.price}
              color={product.color}
              onOpen={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>

      <ProductModal
        isOpen={!!selectedProduct}
        product={selectedProduct || {}}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
}

export default Products;

