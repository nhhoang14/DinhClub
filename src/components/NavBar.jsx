import '../css/NavBar.css';
import logo from '../images/logo.png';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <a href="/">
          <img src={logo} alt="Dinh Club Logo" className='logo-pic' />
        </a>
      </div>
      <ul className="nav-links">
        <li><a href="/">Home Page</a></li>
        <li><p className='divide'>x</p></li>
        <li><a href="/products">Products</a></li>
        <li><p className='divide'>x</p></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
      <div className="cart-icon">
        <span className="material-symbols-outlined">
          shopping_cart
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
