import '../css/MiniCart.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MiniCartItem from '../components/MiniCartItem';
import CartItem from '../models/CartItem';

interface MiniCartProps {
  userCart: CartItem[];
  getCartTotal: () => number;
  updateQty: (code: string, qty: number) => void;
  removeFromCart: (code: string) => void;
}

function MiniCart({ userCart, getCartTotal, updateQty, removeFromCart }: MiniCartProps) {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  return (
    <div className="cart-wrapper">
      <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
        <span className="material-symbols-outlined cart-icon">
          shopping_cart
        </span>
      </button>

      <div className={showCart ? "cart-dropdown open" : "cart-dropdown"}>
        <h4>GIỎ HÀNG ({userCart.length})</h4>

        <div className="cart-items-list">
          {userCart.length === 0 ? (
            <p className="empty-cart-message">Chưa có sản phẩm nào</p>
          ) : (
            <ul>
              {userCart.map((cartItem) => (
                <MiniCartItem
                  key={cartItem.code}
                  cartItem={cartItem}
                  updateQty={(qty) => updateQty(cartItem.code, qty)}
                  removeFromCart={() => removeFromCart(cartItem.code)}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="cart-dropdown-footer">
          <div className="price-detail">
            <span>Tổng tiền:</span>
            <span className="total-price">
              {getCartTotal().toLocaleString('vi-VN')} VND
            </span>
          </div>
          <button className="checkout-btn" onClick={() => navigate('/your-cart')}>THANH TOÁN</button>
        </div>

      </div>
    </div>
  );
}

export default MiniCart;