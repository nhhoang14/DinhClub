import '../css/ProductCard.css';

function ProductCard({ image, title, type, price }) {
  return (
    <div className="product-item">
      <img src={image} className="product-image" alt={title} />
      <div className="product-info">
        <p className="product-title">{title}</p>
        <p className="product-price">{price} VND</p>
        <p className="product-type">{type}</p>
      </div>
    </div>
  );
}

export default ProductCard;