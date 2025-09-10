import '../css/MiniCartItem.css'
import { useState, useEffect } from 'react';
import Product from '../models/Product';
import { CartDetail } from '../types/CartDetail';

interface MiniCartItemProps {
  cartItem: CartDetail;
  updateQty: (qty: number) => void;
  removeFromCart: () => void;
  onOpen: (product: Product) => void;
}

function MiniCartItem({ cartItem, updateQty, removeFromCart, onOpen }: MiniCartItemProps) {
  const [error, setError] = useState<string>('');
  const [inputQty, setInputQty] = useState<number>(cartItem.qty);
  const product = cartItem.product || null;

  useEffect(() => {
    setInputQty(cartItem.qty);
  }, [cartItem]);

  const check = (val: number) => {
    if (!product) {
      setError("Sản phẩm không tồn tại");
      return;
    }
    if (val <= 0) {
      updateQty(0);
      setInputQty(0);
      removeFromCart();
    } else if (val > cartItem.product.stock) {
      setError("Đạt số lượng tối đa trong kho");
      setInputQty(cartItem.product.stock);
      updateQty(cartItem.product.stock);
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
      <div
        className={`cart-item-im ${product && product.stock < 1 ? "out-of-stock" : ""}`}
        onClick={() => {if(product) onOpen(product); }}
      >
        <img src={cartItem.product.image} className="cart-item-img" alt={cartItem.product.name} />
      </div>
      <div className="item-details">
        <p
          className="item-title"
          onClick={() => {if(product) onOpen(product); }}
        >
          {cartItem.product.name}
        </p>
        <p className="item-price"><strong>{cartItem.product.price.toLocaleString('vi-VN')} VND</strong></p>
        <div className="item-qty">
          <button type="button" className="qty-btn" onClick={decrease}>
            <span className="material-symbols-outlined qty-icon">
              remove
            </span>
          </button>
          <input
            id="item-qty-input"
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
    </div >
  );
}

export default MiniCartItem;