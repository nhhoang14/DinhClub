import '../css/UserCart.css';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecommendItem from '../components/RecommendItem';
import UserCartCard from '../components/UserCartCard';
import bedao from '../images/bedao.jpg';
import bemai from '../images/bemai.jpg';
import bequat from '../images/bequat.jpg';
import bety from '../images/bety.jpg';
import summer_st from '../images/summer_st.jpg';
import xmas_st from '../images/xmas_st.jpg';
import ninhbo_st from '../images/ninhbo_st.jpg';

function UserCart() {
  const navigate = useNavigate();

  const cartItems = [
    { image: bedao, title: "BÉ ĐÀO", price: 150000, qty: 2, stock: 10 },
    { image: bemai, title: "BÉ MAI", price: 150000, qty: 1, stock: 5 },
    { image: bequat, title: "BÉ QUẤT", price: 150000, qty: 3, stock: 8 },
    { image: bety, title: "BÉ TỴ", price: 150000, qty: 2, stock: 6 },
    { image: summer_st, title: "HÈ TUYỆT ĐỐI", price: 39000, qty: 5, stock: 12 },
    { image: xmas_st, title: "GIÁNG SINH AN GIẤC", price: 39000, qty: 4, stock: 9 },
    { image: ninhbo_st, title: "DÍNH NỊNH BỢ", price: 59000, qty: 2, stock: 7 },
  ];

  const recommendListRef = useRef(null);
  const [activeBtn, setActiveBtn] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollDistance = 750;

  const handleScrollLeft = () => {
    if (recommendListRef.current) {
      recommendListRef.current.scrollBy({
        left: -scrollDistance,
        behavior: "smooth",
      });
    }

    setActiveBtn("prev");
    setIsPaused(true);
    setTimeout(() => {
      setActiveBtn(null);
      setIsPaused(false);
    }, 2000);
  };

  const handleScrollRight = () => {
    const list = recommendListRef.current;
    if (!list) return;

    if (list.scrollWidth - list.scrollLeft === list.clientWidth) {
      list.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      list.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }

    setActiveBtn("next");
    setIsPaused(true);
    setTimeout(() => {
      setActiveBtn(null);
      setIsPaused(false);
    }, 2000);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleScrollRight();
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, cartItems]);

  return (
    <div className="user-cart">

      {/* cart-content */}
      <div className="cart-content">

        {/* recommend-cart */}
        <div className="recommend-cart">
          <p className="recommend-title">BẠN CÓ CẦN THÊM?</p>
          <div className="recommend-wrapper">
            <div className="recommend-list" ref={recommendListRef}>
              {cartItems.map((item, idx) => (
                <RecommendItem
                  key={idx}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>
            <div className="recommend-ctrl">
              <button className={`recommend-btn recommend-prev ${activeBtn === "prev" ? "active" : ""}`} onClick={handleScrollLeft}>
                <span className="material-symbols-outlined recommend-icon">
                  arrow_back_ios_new
                </span>
              </button>
              <button className={`recommend-btn recommend-next ${activeBtn === "next" ? "active" : ""}`} onClick={handleScrollRight}>
                <span className="material-symbols-outlined recommend-icon">
                  arrow_forward_ios
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* main-cart */}
        <div className="main-cart">
          <p className="main-cart-title">GIỎ HÀNG</p>
          <div className="list-cart">
            {cartItems.map((item, idx) => (
              <UserCartCard key={idx} item={item} />
            ))}
          </div>
          <div className="cart-nav">
            <button className="remove-all-btn">XOÁ HẾT</button>
            <button className="continue-shopping-btn" onClick={() => navigate('/products')}>QUAY LẠI MUA HÀNG</button>
          </div>
        </div>
      </div>

      {/* bill-cart */}
      <div className="bill-cart">
        <p className="bill-title">ĐƠN HÀNG</p>
        <div className="voucher-bill">
          <p className="voucher-title">NHẬP MÃ KHUYẾN MÃI</p>
          <div className="voucher-input">
            <input type="text" />
            <button className="apply-voucher-btn">ÁP DỤNG</button>
          </div>
        </div>
        <ul className="bill-detail">
          <li>
            <span>Đơn hàng</span>
            <span className="bill-price bill-total">0 VND</span>
          </li>
          <li>
            <span>Giảm</span>
            <span className="bill-price discount-price">0 VND</span>
          </li>
        </ul>
        <div className="bill-tmp">
          <span>TẠM TÍNH</span>
          <span className="bill-price tmp-price">0 VND</span>
        </div>
        <button className="checkout-btn" onClick={() => navigate('/shipping-information')}>TIẾP TỤC THANH TOÁN</button>
      </div>
    </div>
  );
}

export default UserCart;
