import '../css/Cart.css'
import { useState } from 'react';
import CartItem from './CartItem.jsx';
import bedao from '../images/bedao.jpg';
import bemai from '../images/bemai.jpg';
import bequat from '../images/bequat.jpg';
import bety from '../images/bety.jpg';
import summer_st from '../images/summer_st.jpg';
import xmas_st from '../images/xmas_st.jpg';
import ninhbo_st from '../images/ninhbo_st.jpg';

function Cart() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([
    { image: bedao, title: "BÉ ĐÀO", price: 150000, qty: 2, stock: 10 },
    { image: bemai, title: "BÉ MAI", price: 150000, qty: 1, stock: 5 },
    { image: bequat, title: "BÉ QUẤT", price: 150000, qty: 3, stock: 8 },
    { image: bety, title: "BÉ TỴ", price: 150000, qty: 2, stock: 6 },
    { image: summer_st, title: "HÈ TUYỆT ĐỐI", price: 39000, qty: 5, stock: 12 },
    { image: xmas_st, title: "GIÁNG SINH AN GIẤC", price: 39000, qty: 4, stock: 9 },
    { image: ninhbo_st, title: "DÍNH NỊNH BỢ", price: 59000, qty: 2, stock: 7 },
  ]);

  // Hàm cập nhật số lượng
  const updateQty = (idx, newQty) => {
    setCartItems(items =>
      items.map((item, i) =>
        i === idx ? { ...item, qty: newQty } : item
      ).filter(item => item.qty > 0)
    );
  };

  return (
    <div className="cart-wrapper">
      <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
        <span className="material-symbols-outlined cart-icon">
          shopping_cart
        </span>
      </button>

      <div className={showCart ? "cart-dropdown open" : "cart-dropdown"}>
        <h4>GIỎ HÀNG ({cartItems.length})</h4>

        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Chưa có sản phẩm nào</p>
          ) : (
            <ul>
              {cartItems.map((item, idx) => (
                <CartItem
                  key={idx}
                  item={item}
                  qty={item.qty}
                  updateQty={newQty => updateQty(idx, newQty)}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="cart-dropdown-footer">
          <div className="price-detail">
            <p><strong>Tổng tiền:</strong></p>
            <p className="total-price">
              {cartItems
                .reduce((total, item) => total + item.price * item.qty, 0)
                .toLocaleString('vi-VN')
              } VND
            </p>
          </div>
          <button className="checkout-btn">THANH TOÁN</button>
        </div>

      </div>
    </div>
  );
}

export default Cart;