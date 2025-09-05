import './css/App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useCart } from './hooks/useCart'
import { useCookieConsent } from './hooks/useCookieConsent'
import { useCheckedItems } from './hooks/useCheckedItems'
import { ToastContainer, Bounce } from "react-toastify";
import BannerCookies from './components/BannerCookies'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import Contact from './pages/Contact'
import UserCartPage from './pages/UserCartPage'
import Checkout from './pages/Checkout'
import Product from './models/Product'
import ProductModal from './components/ProductModal'
import bedao from './images/bedao.jpg';
import bedao_hover from './images/bedao_hover.jpg';
import bemai from './images/bemai.jpg';
import bemai_hover from './images/bemai_hover.jpg';
import bequat from './images/bequat.jpg';
import bequat_hover from './images/bequat_hover.jpg';
import bety from './images/bety.jpg';
import bety_hover from './images/bety_hover.jpg';
import begung from './images/begung.jpg';
import belong from './images/belong.jpg';
import betung from './images/betung.jpg';
import bena from './images/bena.jpg';
import bethong from './images/bethong.jpg';
import bevy from './images/bevy.jpg';
import summer_st from './images/summer_st.jpg';
import xmas_st from './images/xmas_st.jpg';
import ninhbo_st from './images/ninhbo_st.jpg';
import vanphong_st from './images/vanphong_st.jpg';
import dbblue_st from './images/dbblue_st.jpg';
import chualanh_st from './images/chualanh_st.jpg';
import dbblueblack_st from './images/dbblueblack_st.jpg';
import vuive_st from './images/vuive_st.jpg';
import dbblack_st from './images/dbblack_st.jpg';

const Products: Product[] = [
  new Product(1, bedao, bedao_hover, "Bé Đào", "Keychain", "KC01", 0, 150000, "#FA6AA1"),
  new Product(2, bemai, bemai_hover, "Bé Mai", "Keychain", "KC02", 5, 150000, "#C4A8EF"),
  new Product(3, bequat, bequat_hover, "Bé Quất", "Keychain", "KC03", 8, 150000, "#228F4C"),
  new Product(4, bety, bety_hover, "Bé Tỵ", "Keychain", "KC04", 6, 150000, "#FE8CE4"),
  new Product(5, begung, null, "Bé Gừng", "Keychain", "KC05", 8, 145000, "#C8AE9D"),
  new Product(6, belong, null, "Bé Long", "Keychain", "KC06", 5, 145000, "#D3031B"),
  new Product(7, betung, null, "Bé Tùng", "Keychain", "KC07", 6, 145000, "#BEC6B1"),
  new Product(8, bena, null, "Bé Na", "Keychain", "KC08", 3, 145000, "#D81925"),
  new Product(9, bethong, null, "Bé Thông", "Keychain", "KC09", 7, 145000, "#385455"),
  new Product(10, bevy, null, "Bé Vy", "Keychain", "KC10", 8, 145000, "#D6021B"),
  new Product(11, summer_st, null, "Hè Tuyệt Đối", "Sticker", "ST01", 12, 39000, "#2561DD"),
  new Product(12, xmas_st, null, "Giáng Sinh An Giấc", "Sticker", "ST02", 9, 39000, "#D6021B"),
  new Product(13, ninhbo_st, null, "Dính Nịnh Bợ", "Sticker", "ST03", 7, 59000, "#B4B0E2"),
  new Product(14, chualanh_st, null, "Dính Chữa Lành", "Sticker", "ST04", 5, 59000, "#1E1D1B"),
  new Product(15, vuive_st, null, "Dính Vui Vẻ", "Sticker", "ST05", 4, 59000, "#1A63CC"),
  new Product(16, dbblue_st, null, "Dính Blue", "Sticker", "ST06", 3, 59000, "#276BBE"),
  new Product(17, vanphong_st, null, "Dính Văn Phòng", "Sticker", "ST07", 2, 59000, "#050706"),
  new Product(18, dbblack_st, null, "Dính Black", "Sticker", "ST08", 1, 59000, "#276BBE"),
  new Product(19, dbblueblack_st, null, "Dính Blue Black", "Sticker", "ST09", 3, 59000, "#050706"),
];

function App() {
  const { consent } = useCookieConsent();
  const { setCart, cartDetails, addToCart, removeFromCart, updateQty, getItemTotal, resetLastCode } = useCart(Products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { checkedItems, setCheckedItems, getCheckedTotal, notifyCheckedItems } = useCheckedItems({cartDetails, getItemTotal});
  const [closeCookieBanner, setCloseCookieBanner] = useState(false);

  return (
    <div className="App">
      {consent === null && !closeCookieBanner && (
        <BannerCookies onClose={() => setCloseCookieBanner(true)} />
      )}
      <NavBar
        userCart={cartDetails}
        getItemTotal={getItemTotal}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
        onOpen={setSelectedProduct}
      />
      <div className="App-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={
            <ProductsPage
              products={Products}
              onOpen={setSelectedProduct}
            />
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/your-cart" element={
            <UserCartPage
              products={Products}
              userCart={cartDetails}
              getItemTotal={getItemTotal}
              addToCart={addToCart}
              updateQty={updateQty}
              removeFromCart={removeFromCart}
              onOpen={setSelectedProduct}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
              getCheckedTotal={getCheckedTotal}
              notifyCheckedItems={notifyCheckedItems}
            />
          } />
          <Route path="/shipping-information" element={
            <Checkout
              getCheckedTotal={getCheckedTotal}
              setCart={setCart}
              userCart={cartDetails}
              getItemTotal={getItemTotal}
              checkedItems={checkedItems}
              notifyCheckedItems={notifyCheckedItems}
            />
          } />
        </Routes>
      </div>
      <Footer />
      {selectedProduct && (
        <ProductModal
          isOpen={true}
          product={selectedProduct}
          addToCart={addToCart}
          onClose={
            () => {
              setSelectedProduct(null);
              resetLastCode();
            }
          }
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;