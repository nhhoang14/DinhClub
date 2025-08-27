import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import Products from './pages/Products.jsx'
import Contact from './pages/Contact.jsx'
import UserCart from './pages/UserCart.jsx'
import Checkout from './pages/Checkout.jsx'

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <div className="App-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/your-cart" element={<UserCart />} />
            <Route path="/shipping-information" element={<Checkout />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
