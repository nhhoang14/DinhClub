import '../css/ProductModal.css';

function ProductModal({ isOpen, product, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay"
            onClick={onClose}
            style={{ '--product-color': product.color }}
        >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-nav">
                    <p className="modal-heading">Products
                        <span className="material-symbols-outlined modal-arrow-icon">
                            arrow_forward_ios
                        </span>
                        {product.type}</p>
                    <button className="close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined close-icon">
                            close
                        </span>
                    </button>
                </div>
                <div className="modal-main">
                    <img src={product.image} className="modal-img" alt={product.title} />
                    <div className="modal-detail">
                        <h2 className="modal-title">{product.title}</h2>
                        {/* <p className="modal-type">Mã sản phẩm: {product.type}</p> */}
                        <p className="modal-price">{product.price} VND</p>
                        <div className="modal-quantity">
                            <p className="quantity-heading">Số lượng:</p>
                            <select className="quantity-slt">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                        <button className="add-to-cart">Thêm vào giỏ hàng</button>
                        <button className="order-btn">Đặt hàng ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;
