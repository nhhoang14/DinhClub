import '../css/NavBar.css';
import logo from '../images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import MiniCart from './MiniCart';
import CartItem from '../models/CartItem'

interface NavBarProps {
  userCart: CartItem[];
  getCartTotal: () => number;
  updateQty: (code: string, qty: number) => void;
  removeFromCart: (code: string) => void;
}

function NavBar({ userCart, getCartTotal, updateQty, removeFromCart }: NavBarProps) {
  const location = useLocation();

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
        <MiniCart
          userCart={userCart}
          getCartTotal={getCartTotal}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
        />
      </div>
    </nav>
  );
}

export default NavBar;
