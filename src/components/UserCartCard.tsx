import { useEffect, useState } from 'react';
import '../css/UserCartCard.css';
import Product from '../models/Product';
import { CartDetail } from '../models/CartDetail';

interface UserCartCardProps {
    cartItem: CartDetail;
    getItemTotal: (item: CartDetail) => number;
    updateQty: (qty: number) => void;
    removeFromCart: () => void;
    onOpen: (product: Product) => void;
    checked: boolean;
    onCheck: () => void;
}

function UserCartCard({ cartItem, getItemTotal, updateQty, removeFromCart, onOpen, checked, onCheck }: UserCartCardProps) {
    const [error, setError] = useState<string>('');
    const [inputQty, setInputQty] = useState<number>(cartItem.qty);
    if (!cartItem.product) {
        return <div className="user-cart-card error">Sản phẩm không tồn tại</div>;
    }


    useEffect(() => {
        setInputQty(cartItem.qty);
    }, [cartItem]);

    const check = (val: number) => {
        if (val > cartItem.product.stock) {
            setError("Sản phẩm đã đạt số lượng tối đa của cửa hàng!");
            setInputQty(cartItem.product.stock);
            updateQty(cartItem.product.stock);
        } else {
            setInputQty(val);
            setError("");
            updateQty(val);
        }
    };

    const increase = () => check(inputQty + 1);
    const decrease = () => {
        if (inputQty > 1) check(inputQty - 1);
    };

    return (
        <div className="user-cart-overlay">
            <div className="user-cart-card">
                <div className="card-content">
                    <div
                        className={`user-cart-img ${cartItem.product && cartItem.product.stock < 1 ? "out-of-stock" : ""}`}
                        onClick={() => { if (cartItem.product) onOpen(cartItem.product); }}
                    >
                        <img src={cartItem.product.image} className="main-cart-img" alt={cartItem.product.name} />
                    </div>
                    <div className="card-detail-info">
                        <p className="card-name"
                            onClick={() => { if (cartItem.product) onOpen(cartItem.product); }}
                        >
                            {cartItem.product.name}
                        </p>
                        <p className="card-price">
                            <span>Giá: </span>
                            <span>{cartItem.product.price.toLocaleString('vi-VN')} VND</span>
                        </p>
                        <div className="user-card-qty">
                            <button type="button" className="qty-btn" onClick={decrease}>
                                <span className="material-symbols-outlined qty-icon">
                                    remove
                                </span>
                            </button>
                            <input
                                id="user-card-input"
                                type="text"
                                min={1}
                                value={inputQty}
                                onChange={e => setInputQty(Number(e.target.value.replace(/[^0-9]/g, '')))} //chỉ nhập được số
                                onBlur={() => {
                                    if (!inputQty || inputQty < 1) {
                                        check(1);
                                    } else {
                                        check(inputQty);
                                    }
                                }}
                                onKeyDown={e => { if (e.key === 'Enter') check(Number(inputQty)); }}
                            />
                            <button type="button" className="qty-btn" onClick={increase}>
                                <span className="material-symbols-outlined qty-icon">
                                    add_2
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-overall-info">
                    <p className="card-total-price">{getItemTotal(cartItem).toLocaleString('vi-VN')} VND</p>
                    <p className="card-status">{cartItem.product && cartItem.product.stock > 0 ? "Còn hàng" : "Hết hàng"}</p>
                    <button
                        className={`card-status-btn card-check-btn${checked ? " active" : ""}`}
                        onClick={onCheck}
                    >
                        {checked ? (
                            <span className="material-symbols-outlined card-check-icon">
                                check_small
                            </span>
                        ) : (
                            <span className="material-symbols-outlined card-uncheck-icon">
                                check_indeterminate_small
                            </span>
                        )}
                    </button>
                    <button className="card-status-btn card-remove-btn" onClick={removeFromCart}>
                        <span className="material-symbols-outlined card-remove-icon">
                            delete
                        </span>
                    </button>
                </div>
            </div>
            {error && <p className='error-message'>{error}</p>}
        </div>
    );
}

export default UserCartCard;