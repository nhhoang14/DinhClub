import '../css/UserCart.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecommendItem from '../components/RecommendItem';
import bedao from '../images/bedao.jpg';
import bemai from '../images/bemai.jpg';
import bequat from '../images/bequat.jpg';
import bety from '../images/bety.jpg';
import summer_st from '../images/summer_st.jpg';
import xmas_st from '../images/xmas_st.jpg';
import ninhbo_st from '../images/ninhbo_st.jpg';

function UserCart() {
  const navigate = useNavigate();

  // const [cartItems, setCartItems] = useState([
  const cartItems = [
    { image: bedao, title: "BÉ ĐÀO", price: 150000, qty: 2, stock: 10 },
    { image: bemai, title: "BÉ MAI", price: 150000, qty: 1, stock: 5 },
    { image: bequat, title: "BÉ QUẤT", price: 150000, qty: 3, stock: 8 },
    { image: bety, title: "BÉ TỴ", price: 150000, qty: 2, stock: 6 },
    { image: summer_st, title: "HÈ TUYỆT ĐỐI", price: 39000, qty: 5, stock: 12 },
    { image: xmas_st, title: "GIÁNG SINH AN GIẤC", price: 39000, qty: 4, stock: 9 },
    { image: ninhbo_st, title: "DÍNH NỊNH BỢ", price: 59000, qty: 2, stock: 7 },
  ];

  return (
    <div className="user-cart">
      <div className="cart-content">
        <div className="recommend-card">
            <p>BẠN CÓ CẦN THÊM?</p>
            <div className="recommend-list">
                {cartItems.map((item) => (
                    <RecommendItem key={item.title} image={item.image} title={item.title} price={item.price} />
                ))}
            </div>
        </div>
        <div className="main-cart">
          <h4>GIỎ HÀNG</h4>
          <div className="list-cart">

          </div>
          <div className="cart-nav">
            <button>XOÁ HẾT</button>
            <button className="continue-shopping-btn" onClick={() => navigate('/products')}>QUAY LẠI MUA HÀNG</button>
          </div>
        </div>
      </div>
      <div className="bill-cart">
        <p className="bill-title">ĐƠN HÀNG</p>
        <div className="voucher-bill">
          <p className="voucher-title">NHẬP MÃ KHUYẾN MÃI</p>
          <input type="text" />
          <button className="apply-voucher-btn">ÁP DỤNG</button>
        </div>
        <ul className="bill-detail">
          <li>
            <span>Đơn hàng</span>
            <span className="bill-price bill-total">0 VND</span>
          </li>
          <li>
            <span>Giảm</span>
            <span className="bill-price discount-price">0 VND</span>
          </li>
        </ul>
        <div className="bill-tmp">
          <span>TẠM TÍNH</span>
          <span className="bill-price tmp-price">0 VND</span>
        </div>
        <button className="checkout-btn" onClick={() => navigate('/shipping-information')}>TIẾP TỤC THANH TOÁN</button>
      </div>
    </div>
  );
}

export default UserCart;
