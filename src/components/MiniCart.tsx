import '../css/MiniCart.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sortCartItems } from "../utils/sortHelpers";
import MiniCartItem from '../components/MiniCartItem';
import Product from '../models/Product';
import { CartDetail } from '../models/CartDetail';

interface MiniCartProps {
  userCart: CartDetail[];
  getItemTotal: (item: CartDetail) => number;
  updateQty: (code: string, qty: number) => void;
  removeFromCart: (code: string) => void;
  onOpen: (product: Product) => void;
}

function MiniCart({ userCart, getItemTotal, updateQty, removeFromCart, onOpen }: MiniCartProps) {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  const getAvailableCartTotal = () => {
  return userCart
    .filter(item => item.product && item.product.stock > 0)
    .reduce((total, item) => total + getItemTotal(item), 0);
};

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
            <div>
              {sortCartItems(userCart).map((item) => (
                <MiniCartItem
                  key={item.code}
                  cartItem={item}
                  updateQty={(qty) => updateQty(item.code, qty)}
                  removeFromCart={() => removeFromCart(item.code)}
                  onOpen={(product) => onOpen(product)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="cart-dropdown-footer">
          <div className="price-detail">
            <span>Tổng tiền:</span>
            <span className="total-price">
              {getAvailableCartTotal().toLocaleString('vi-VN')} VND
            </span>
          </div>
          <button className="checkout-btn" onClick={() => navigate('/your-cart')}>THANH TOÁN</button>
        </div>

      </div>
    </div>
  );
}

export default MiniCart;