import '../css/HomePage.css';
import { useNavigate } from 'react-router-dom';
import bannerImage from '../images/banner_pic.png';
import contactImage from '../images/contact_homepage.png';
import hanoi from '../images/logo_hanoi.jpg';
import hcm from '../images/logo_hcm.jpg';
import taiwan from '../images/logo_taiwan.jpg';

function HomePage() {
  const navigate = useNavigate();
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
          <img src={hanoi} className="location-logo logo-hanoi" alt="Hanoi" onClick={() => window.location.href = 'https://www.instagram.com/dinh.collective/'}/>
          <img src={hcm} className="location-logo logo-hcm" alt="HCM" onClick={() => window.location.href = 'https://www.instagram.com/ohquao/'}/>
          <img src={taiwan} className="location-logo logo-taiwan" alt="Taiwan" onClick={() => window.location.href = 'https://www.instagram.com/robi.select/'}/>
          <div className="floating-location">
            <p className="location-name hanoi">Hà Nội</p>
            <p className="location-name hcm">Hồ Chí Minh</p>
            <p className="location-name taiwan">Taiwan</p>
          </div>
        </div>
      </div>

      {/* contact */}
      <div className="homepage-contact">
        <div className="img-contact">
          <img src={contactImage} className='contact-homepage' alt="Contact" />
        </div>
        <div className="info-contact">
          <h2 className="contact-title">Các mom có thắc mắc gì? Hãy liên hệ cho tụi mình nháaaa!</h2>
          <button className="contact-btn" onClick={() => navigate('/contact')}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
