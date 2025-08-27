import '../css/RecommendItem.css';

function RecommendItem({ image, title, price }) {
    return (
        <div className="recommend-item">
            <img src={image} alt={title} />
            <div className="recommend-info">
                <p>{title}</p>
                <span>{price.toLocaleString('vi-VN')} VND</span>
                <button>THÊM</button>
            </div>
        </div>
    );
}

export default RecommendItem;
