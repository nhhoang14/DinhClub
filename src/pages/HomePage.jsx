import '../css/HomePage.css';
import { useNavigate } from 'react-router-dom';
import bannerImage from '../images/banner_pic.png';
import contactImage from '../images/contact_homepage.png';

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
