import '../css/RecommendItem.css';
import Product from '../models/Product';

export interface RecommendItemProps {
    recommendItem: Product;
    addToCart: (qty: number) => void;
    onOpen: (product: Product) => void;
}

function RecommendItem({ recommendItem, addToCart, onOpen }: RecommendItemProps) {
    return (
        <div className="recommend-item">
            <img
                src={recommendItem.image}
                alt={recommendItem.name}
                onClick={() => onOpen(recommendItem)}
            />
            <div className="recommend-info">
                <p onClick={() => onOpen(recommendItem)}>{recommendItem.name}</p>
                <span>{recommendItem.price.toLocaleString('vi-VN')} VND</span>
                <button onClick={() => addToCart(1)}>THÊM</button>
            </div>
        </div>
    );
}

export default RecommendItem;
