    import '../css/ProductModal.css';
    import { useState } from 'react';

    function ProductModal({ isOpen, product, onClose }) {
        if (!isOpen) return null;

        const [qty, setQty] = useState(1);

        const increase = () => setQty(qty + 1);
        const decrease = () => {
            if (qty > 1) setQty(qty - 1);
        };

        return (
            <div className="modal-overlay"
                onClick={onClose}
                style={{ '--product-color': product.color }}
            >
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-nav">
                        <div className="modal-follow">
                            <p className="modal-heading">PRODUCTS</p>
                            <span className="material-symbols-outlined modal-arrow-icon">
                                arrow_forward_ios
                            </span>
                            <p className="modal-heading">{product.type.toUpperCase()}</p>
                            <span className="material-symbols-outlined modal-arrow-icon">
                                arrow_forward_ios
                            </span>
                            <p className="modal-heading">{product.code}</p>
                        </div>
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
                            <p className="modal-code">Mã sản phẩm: <strong>{product.code}</strong></p>
                            <p className="modal-price">{product.price} VND</p>
                            <div className="modal-quantity">
                                <label htmlFor="qty">SỐ LƯỢNG</label>
                                <div className="quantity">
                                    <button type="button" className="qty-btn" onClick={decrease}>
                                        <span className="material-symbols-outlined qty-icon">
                                            remove
                                        </span>
                                    </button> 
                                    <input id="qty" type="text" value={qty} readOnly />
                                    <button type="button" className="qty-btn" onClick={increase}>
                                        <span className="material-symbols-outlined qty-icon">
                                            add_2
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <button className="add-to-cart">THÊM VÀO GIỎ HÀNG</button>
                            <button className="order-btn">THANH TOÁN</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default ProductModal;
