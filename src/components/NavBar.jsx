import '../css/NavBar.css';
import logo from '../images/logo.png';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartDropdown from '../components/CartDropdown.jsx';
import bedao from '../images/bedao.jpg';
import bemai from '../images/bemai.jpg';
import bequat from '../images/bequat.jpg';
import bety from '../images/bety.jpg';
import summer_st from '../images/summer_st.jpg';
import xmas_st from '../images/xmas_st.jpg';
import ninhbo_st from '../images/ninhbo_st.jpg';

function NavBar() {
  const location = useLocation();

  const [showCart, setShowCart] = useState(false);

  const handleTopClick = () => {
    if (location.pathname === location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const cartItems = [
    { image: bedao, title: "BÉ ĐÀO", price: 150000, qty: 2, stock: 10},
    { image: bemai, title: "BÉ MAI", price: 150000, qty: 1, stock: 5 },
    { image: bequat, title: "BÉ QUẤT", price: 150000, qty: 3, stock: 8 },
    { image: bety, title: "BÉ TỴ", price: 150000, qty: 2, stock: 6 },
    { image: summer_st, title: "HÈ TUYỆT ĐỐI", price: 39000, qty: 5, stock: 12 },
    { image: xmas_st, title: "GIÁNG SINH AN GIẤC", price: 39000, qty: 4, stock: 9 },
    { image: ninhbo_st, title: "DÍNH NỊNH BỢ", price: 59000, qty: 2, stock: 7 },
  ];

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" onClick={handleTopClick}>
          <img src={logo} alt="Dinh Club Logo" className='logo-pic' />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/" className="nav-link" onClick={handleTopClick}>
          Home Page
        </Link></li>
        <li><p className='divide'>x</p></li>
        <li><Link to="/products" className="nav-link" onClick={handleTopClick}>
          Products
        </Link></li>
        <li><p className='divide'>x</p></li>
        <li><Link to="/contact" className="nav-link" onClick={handleTopClick}>
          Contact Us
        </Link></li>
      </ul>
      {/* cart */}
      <div className="nav-cart">
        <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
          <span className="material-symbols-outlined cart-icon">
            shopping_cart
          </span>
        </button>
        {showCart && <CartDropdown cartItems={cartItems} />}
      </div>
    </nav>
  );
}

export default NavBar;
