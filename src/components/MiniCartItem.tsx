import '../css/MiniCartItem.css'
import { useState, useEffect } from 'react';
import CartItem from '../models/CartItem';

interface MiniCartItemProps {
  cartItem: CartItem;
  updateQty: (qty: number) => void;
  removeFromCart: () => void;
}

function MiniCartItem({ cartItem, updateQty, removeFromCart }: MiniCartItemProps) {
  const [error, setError] = useState<string>('');
  const [inputQty, setInputQty] = useState<number>(cartItem.qty);

  useEffect(() => {
    setInputQty(cartItem.qty);
  }, [cartItem]);

  const check = (val: number) => {
    if (val <= 0) {
      updateQty(0);
      setInputQty(0);
      removeFromCart();
    } else if (val > cartItem.stock) {
      setError("Vượt quá số hàng trong kho");
      setInputQty(cartItem.stock);
      updateQty(cartItem.stock);
    } else {
    setInputQty(val);
    setError("");
    updateQty(val);
  }
};

const increase = () => check(inputQty + 1);
const decrease = () => check(inputQty - 1);

return (
  <div className="cart-item">
    <img src={cartItem.image} className="cart-item-img" alt={cartItem.name} />
    <div className="item-details">
      <p className="item-title">{cartItem.name}</p>
      <p className="item-price"><strong>{cartItem.price.toLocaleString('vi-VN')} VND</strong></p>
      <div className="item-qty">
        <button type="button" className="qty-btn" onClick={decrease}>
          <span className="material-symbols-outlined qty-icon">
            remove
          </span>
        </button>
        <input
          id="qty"
          type="text"
          min={0}
          value={inputQty}
          onChange={e => setInputQty(Number(e.target.value.replace(/[^0-9]/g, '')))} //chỉ nhập được số
          onBlur={() => check(Number(inputQty))}
          onKeyDown={e => { if (e.key === 'Enter') check(Number(inputQty)); }}
        />
        <button type="button" className="qty-btn" onClick={increase}>
          <span className="material-symbols-outlined qty-icon">
            add_2
          </span>
        </button>
      </div>
      {error && <p className='error-message'>{error}</p>}
    </div>
  </div>
);
}

export default MiniCartItem;