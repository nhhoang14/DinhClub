import '../css/UserCartCard.css';
import CartItem from '../models/CartItem';

interface UserCartCardProps {
    cartItem: CartItem;
    updateQty: (qty: number) => void;
    removeFromCart: () => void;
}

function UserCartCard({ cartItem, updateQty, removeFromCart }: UserCartCardProps) {
    return (
        <div className="user-cart-card">
            <img src={cartItem.image} className="main-cart-img" alt={cartItem.name} />
            <div className="card-content">
                <h3 className="card-name">{cartItem.name}</h3>
                <p className="card-price">{cartItem.price.toLocaleString('vi-VN')} VND</p>
                <div className="card-qty">
                    <button onClick={() => updateQty(cartItem.qty - 1)}>-</button>
                    <span>{cartItem.qty}</span>
                    <button onClick={() => updateQty(cartItem.qty + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={removeFromCart}>Xoá</button>
            </div>
        </div>
    );
}

export default UserCartCard;