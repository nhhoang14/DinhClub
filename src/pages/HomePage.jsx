import '../css/HomePage.css';
import bannerImage from '../images/banner_pic.png';

function HomePage() {
  return (
    <div className="homepage">
      <div className="banner">
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
    </div>
  );
}

export default HomePage;
