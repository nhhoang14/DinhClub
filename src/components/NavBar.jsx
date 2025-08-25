import '../css/NavBar.css';
import logo from '../images/logo.png';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cart from '../components/Cart';

function NavBar() {
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);

  const handleTopClick = () => {
    if (location.pathname === location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
        <button className="cart-btn"
          onClick={() => setCartItems([])}>
          <span className="material-symbols-outlined cart-icon">
            shopping_cart
          </span>
        </button>
        {cartItems.length > 0 && (
          <div className="cart-count">
            {cartItems.length}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
