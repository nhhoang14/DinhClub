import '../css/UserCartPage.css';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sortCartItems, filterRecommend } from "../utils/sortHelpers";
import RecommendItem from '../components/RecommendItem';
import UserCartCard from '../components/UserCartCard';
import { CartDetail } from '../models/CartDetail';
import Product from '../models/Product';

interface UserCartPageProps {
  products: Product[];
  userCart: CartDetail[];
  getItemTotal: (item: CartDetail) => number;
  addToCart: (product: Product, qty: number) => void;
  updateQty: (code: string, qty: number) => void;
  removeFromCart: (code: string) => void;
  onOpen: (product: Product) => void;
}

function UserCartPage({ products, userCart, getItemTotal, addToCart, updateQty, removeFromCart, onOpen }: UserCartPageProps) {
  const navigate = useNavigate();
  const recommendListRef = useRef<HTMLDivElement>(null);
  const [activeBtn, setActiveBtn] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollDistance = 750;

  const recommendItems: Product[] = filterRecommend(products, userCart);
  const [checkedItems, setCheckedItems] = useState<string[]>(
    userCart.map(item => item.code)
  );

  useEffect(() => {
    setCheckedItems(userCart.map(item => item.code));
  }, [userCart]);

  const handleCheck = (code: string) => {
    setCheckedItems(prev =>
      prev.includes(code)
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  const getCheckedTotal = () => {
    return userCart
      .filter(item => checkedItems.includes(item.code))
      .reduce((total, item) => total + getItemTotal(item), 0);
  };

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
  }, [isPaused, userCart]);

  return (
    <div className="user-cart">
      {/* cart-content */}
      <div className="cart-content">
        {/* recommend-cart */}
        <div className="recommend-cart">
          <p className="recommend-title">BẠN CÓ CẦN THÊM?</p>
          <div className="recommend-wrapper">
            <div className="recommend-list" ref={recommendListRef}>
              {recommendItems.map((item, idx) => (
                <RecommendItem
                  key={idx}
                  recommendItem={item}
                  addToCart={(qty) => void addToCart(item, qty)}
                  onOpen={onOpen}
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
            {sortCartItems(userCart).map(item => (
              <UserCartCard
                key={item.code}
                cartItem={item}
                getItemTotal={getItemTotal}
                updateQty={qty => updateQty(item.code, qty)}
                removeFromCart={() => removeFromCart(item.code)}
                onOpen={onOpen}
                checked={checkedItems.includes(item.code)}
                onCheck={() => handleCheck(item.code)}
              />
            ))}
          </div>
          <div className="cart-nav">
            <button className="remove-all-btn" onClick={() => userCart.forEach(item => removeFromCart(item.code))}>XOÁ HẾT</button>
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
            <span className="bill-price bill-total">{getCheckedTotal().toLocaleString('vi-VN')} VND</span>
          </li>
          <li>
            <span>Giảm</span>
            <span className="bill-price discount-price">0 VND</span>
          </li>
        </ul>
        <div className="bill-tmp">
          <span>TẠM TÍNH</span>
          <span className="bill-price tmp-price">{getCheckedTotal().toLocaleString('vi-VN')} VND</span>
        </div>
        <button className="checkout-btn" onClick={() => navigate('/shipping-information')}>TIẾP TỤC THANH TOÁN</button>
      </div>
    </div>
  );
}

export default UserCartPage;
