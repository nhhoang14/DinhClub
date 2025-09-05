import { useCookieConsent } from '../hooks/useCookieConsent'
import '../css/BannerCookies.css'

type BannerCookiesProps = {
  onClose: () => void;
};

function BannerCookies({ onClose }: BannerCookiesProps) {
  const { accept, decline } = useCookieConsent();
  return (
    <div className="banner-cookies-container">
      <div className="cookie-main">
        <img src='./cookie.png' alt="Cookies Banner" className="banner-cookies-image" />
        <div className="cookie-content">
          <span>Chúng tôi sử dụng cookies để lưu giỏ hàng, cải thiện trải nghiệm mua sắm và cá nhân hóa nội dung. Bạn có đồng ý không?</span>
          <div className="cookie-actions">
            <button onClick={accept} className="cookie-btn accept-btn">Đồng ý</button>
            <button onClick={decline} className="cookie-btn decline-btn">Từ chối</button>
          </div>
        </div>
      </div>
      <button className="banner-cookies-close" onClick={onClose}>
        <span className="material-symbols-outlined cookies-close-icon">
          close
        </span>
      </button>
    </div>
  );
}

export default BannerCookies;