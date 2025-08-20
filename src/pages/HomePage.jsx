import '../css/HomePage.css';
import { useRef } from 'react';
import { useNavigate} from 'react-router-dom';
import bannerImage from '../images/banner_pic.png';
import contactImage from '../images/contact_homepage.png';
import hanoi from '../images/logo_hanoi.jpg';
import hcm from '../images/logo_hcm.jpg';
import taiwan from '../images/logo_taiwan.jpg';
import feedback from '../images/feedback.jpg';
import back_btn from '../images/back_btn.png';
import next_btn from '../images/next_btn.png';
import FeedbackCard from '../components/FeedbackCard.jsx';

function HomePage() {
  const navigate = useNavigate();
  const slideRef = useRef(null);

  const scrollDistance = 500 + 32;

  const handleScrollLeft = () => {
    if (slideRef.current) {
      slideRef.current.scrollBy({ left: -scrollDistance, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (slideRef.current) {
      slideRef.current.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  };

  return (
    <div className="homepage">

      {/* banner */}
      <div className="homepage-banner">
        <h1 className='banner-title'>Cửa hàng thủ công thú dị</h1>
        <div className='banner-content'>
          <p>Merchandise từ các bé thú xinh điên!</p>
          <div className="center-image">
            <img src={bannerImage} className="banner-image" alt="Banner" />
            <div className="floating">
              <div className="floating-text text1">NHIỀU TÓC</div>
              <div className="floating-text text2">KHỎE</div>
              <div className="floating-text text3">MÃI ĐỈNH</div>
              <div className="floating-text text4">8386</div>
              <div className="floating-text text5">XINH ĐIÊN</div>
              <div className="floating-text text6">GIÀU ĐIÊN</div>
            </div>
          </div>
          <p>Hãy cứ vô tri và lạc quan lên bạn iuuuu</p>
        </div>
      </div>

      {/* list-products */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="products-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 Q0.5,0.1 1,0 L1,1 Q0.5,0.9 0,1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="homepage-products">
        <h2 className="products-title">Sản phẩm nổi bật</h2>
        <div className="products-list">
          {/* Render product items here */}
        </div>
      </div>

      {/* feedback */}
      <div className="homepage-feedback">
        <div className="feedback-nav">
          <div className="feedback-heading">
            <img src={feedback} className="feedback-image" alt="Feedback" />
            <h2 className="feedback-title">Phách bít của các hội viên</h2>
          </div>
          <div className="feedback-ctrl">
            <button className="feedback-btn" onClick={handleScrollLeft}>
              <img src={back_btn} className="feedback-icon" alt="feedback-left" />
            </button>
            <button className="feedback-btn" onClick={handleScrollRight}>
              <img src={next_btn} className="feedback-icon" alt="feedback-right" />
            </button>
          </div>
        </div>
        <div className="feedback-content" ref={slideRef}>
          <FeedbackCard feedback={{ text: "Sản phẩm tuyệt vời, tôi rất hài lòng!", author: "Khách hàng A", bgColor: "#D4C9FF" , textColor: "#7A7198" }} />
          <FeedbackCard feedback={{ text: "Dịch vụ chăm sóc khách hàng rất tốt!", author: "Khách hàng B", bgColor: "#D7F46E", textColor: "#148A4D" }} />
          <FeedbackCard feedback={{ text: "Tôi sẽ quay lại mua sắm tiếp!", author: "Khách hàng C", bgColor: "#FF9BE3", textColor: "#4F81FA" }} />
          <FeedbackCard feedback={{ text: "Các Pé nhà mình bên ngoài trông cưng cáaa!", author: "Khách hàng D", bgColor: "#5182F9", textColor: "#F1E28D" }} />
        </div>
      </div>

      {/* location */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="location-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 Q0.5,0.1 1,0 L1,0.9 Q0.5,1 0,0.9 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="homepage-location">
        <div className="location-content">
          <h2 className="location-title">Các hội viên có thể gặp trực tiếp các pé tại đây ạaaa!</h2>
          <p className="location-subtitle">Câu lạc bộ Dính chính thức kí gửi một số con vợ tuyển chọn</p>
        </div>
        <div className="location-logos">
          <img src={hanoi} className="location-logo logo-hanoi" alt="Hanoi" onClick={() => window.location.href = 'https://www.instagram.com/dinh.collective/'} />
          <img src={hcm} className="location-logo logo-hcm" alt="HCM" onClick={() => window.location.href = 'https://www.instagram.com/ohquao/'} />
          <img src={taiwan} className="location-logo logo-taiwan" alt="Taiwan" onClick={() => window.location.href = 'https://www.instagram.com/robi.select/'} />
          <div className="floating-location">
            <p className="location-name hanoi">Hà Nội</p>
            <p className="location-name hcm">Hồ Chí Minh</p>
            <p className="location-name taiwan">Taiwan</p>
          </div>
        </div>
      </div>

      {/* contact */}
      <div className="homepage-contact">
        <div className="img-hpcontact">
          <img src={contactImage} className='contact-homepage' alt="Contact" />
        </div>
        <div className="info-hpcontact">
          <h2 className="hpcontact-title">Các mom có thắc mắc gì? Hãy liên hệ cho tụi mình nháaaa!</h2>
          <button className="hpcontact-btn" onClick={() => navigate('/contact')}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
