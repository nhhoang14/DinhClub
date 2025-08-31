import '../css/Footer.css';
import logo from '../images/logo.png';
import earth from '../images/earth.png';

function Footer() {
  return (
    <div className="footer">
      <div className="main-footer">
        <div className="info-container">
          <img src={logo} className="footer-logo" alt="Logo" />
          <h1 className="footer-title">Merchandise thủ công xinh điên từ các bé thú cực dị!</h1>
          <div className="info-footer">
            <button className="social-button" onClick={() => window.open('https://www.instagram.com/dinh.club/', '_blank')}>
              <img src='./instagram.png' className="social-icon" alt="Instagram" />
            </button>
            <button className="social-button" onClick={() => window.open('https://www.threads.com/@dinh.club', '_blank')}>
              <img src='./threads.png' className="social-icon" alt="Threads" />
            </button>
          </div>
        </div>
        <p className="footer-rights">&copy; 2024 Dinh Club. All rights reserved.</p>
      </div>
      <div className="sub-footer">
        <img src={earth} className="earth" alt="Earth" />
        <div className="floating">
          <div className="floating-text text1">XIN CHÀO</div>
          <div className="floating-text text2">你好</div>
          <div className="floating-text text3">HELLO</div>
          <div className="floating-text text4">안녕하세요</div>
          <div className="floating-text text5">こんにちは</div>
          <div className="floating-text text6">HOLA</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
