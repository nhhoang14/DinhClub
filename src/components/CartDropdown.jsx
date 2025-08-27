import '../css/CartDropdown.css'
import CartItem from '../components/CartItem.jsx';

function CartDropdown({ cartItems }) {

  return (
    <div className="cart-dropdown">
      <h4>GIỎ HÀNG ({cartItems.length})</h4>
      <div className="cart-items-list">
        {cartItems.length === 0 ? (
          <p>Chưa có sản phẩm nào</p>
        ) : (
          <ul>
            {cartItems.map((item, idx) => (
              <CartItem key={idx} item={item} />
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
  );
}

export default CartDropdown;
