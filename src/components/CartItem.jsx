import '../css/CartItem.css'
import { useState, useEffect } from 'react';

function CartItem({ item, qty, updateQty }) {
  const [error, setError] = useState('');
  const [inputQty, setInputQty] = useState(qty);

  useEffect(() => {
    setInputQty(qty);
  }, [qty]);


  const increase = () => {
    if (qty < item.stock) {
      updateQty(qty + 1);
      setError('');
    } else {
      setError('Vượt quá số hàng trong kho');
    }
  };

  const decrease = () => {
    if (qty > 1) {
      updateQty(qty - 1);
      setError('');
    } else if (qty === 1) {
      updateQty(0);
      setError('');
    }
  };

  if (qty == 0) return null;

  return (
    <div className="cart-item">
      <img src={item.image} className="cart-item-img" alt={item.title} />
      <div className="item-details">
        <p className="item-title">{item.title}</p>
        <p className="item-price"><strong>{item.price.toLocaleString('vi-VN')} VND</strong></p>
        <div className="item-qty">
          <button type="button" className="qty-btn" onClick={decrease}>
            <span className="material-symbols-outlined qty-icon">
              remove
            </span>
          </button>
          <input
            id="qty"
            type="text"
            value={inputQty}
            onChange={e => {
              const val = Number(e.target.value) || 0;
              setInputQty(val);
              setError(val > item.stock ? 'Vượt quá số hàng trong kho' : '');
            }}
             onBlur={() => {
              updateQty(inputQty);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                updateQty(inputQty);
              }
            }}
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

export default CartItem;