import '../css/NavBar.css';
import logo from '../images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import MiniCart from './MiniCart';
import Product from '../models/Product';
import { CartDetail } from '../models/CartDetail';

interface NavBarProps {
  userCart: CartDetail[];
  getItemTotal: (item: CartDetail) => number;
  updateQty: (code: string, qty: number) => void;
  removeFromCart: (code: string) => void;
  onOpen: (product: Product) => void;
}

function NavBar({ userCart, getItemTotal, updateQty, removeFromCart, onOpen }: NavBarProps) {
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
          getItemTotal={getItemTotal}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
          onOpen={onOpen}
        />
      </div>
    </nav>
  );
}

export default NavBar;
