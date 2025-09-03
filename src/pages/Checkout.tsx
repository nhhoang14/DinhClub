import '../css/Checkout.css';
import { CartDetail } from '../models/CartDetail';
// import Discount from '../models/Discount';

interface CheckoutProps {
  getCheckedTotal: () => number;
  userCart: CartDetail[];
  getItemTotal: (item: CartDetail) => number;
  checkedItems: string[];
}

function Checkout({ getCheckedTotal, userCart, getItemTotal, checkedItems }: CheckoutProps) {

  const shippingFee = 50000;
  const discount = 100000;
  const finalTotal = getCheckedTotal() - discount + shippingFee;

  return (
    <form className="checkout-container" action="">
      {/* checkout-main */}
      <div className="checkout-main">
        {/* shipping-info */}
        <div className="shipping-info">
          <p>THÔNG TIN GIAO HÀNG</p>
          <input className="form-control"
            type="text"
            name="name"
            placeholder="Họ và tên"
            onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^\p{L}' ]/gu, '')}
            required
          />
          <input className="form-control"
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')}
            required
          />
          <input className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input className="form-control"
            type="text"
            name="address"
            placeholder="Địa chỉ"
            onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^\p{L}' ]/gu, '')}
            required
          />
          <select className="form-control" name="city" required>
            <option value="">tỉnh/thành phố</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="TP.HCM">TP.HCM</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
          </select>
          <div className="address-detail-city">
            <select className="detail-city-item" name="district" required>
              <option value="">Quận/Huyện</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP.HCM">TP.HCM</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>
            <select className="detail-city-item" name="ward" required>
              <option value="">Phường/Xã</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP.HCM">TP.HCM</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>
          </div>
          <label>
            <input type="checkbox" className="custom-checkbox" name="agree" value="yes" />
            <span>Cập nhật các thông tin mới nhất về chương trình từ Dính Club</span>
          </label>
        </div>

        {/* checkout-shipping-method */}
        <div className="checkout-shipping-method">
          <p>PHƯƠNG THỨC VẬN CHUYỂN</p>
          <div className="shipping-method">
            <label>
              <input type="radio" className="custom-radio" name="shipping-method" value="ghht" defaultChecked />
              <span>Hỏa tốc (từ 1 - 3 ngày làm việc)</span>
              <span className="order-price">{shippingFee.toLocaleString('vi-VN')} VND</span>
            </label>
            <label>
              <input type="radio" className="custom-radio" name="shipping-method" value="ghn" />
              <span>Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc)</span>
              <span className="order-price">{shippingFee.toLocaleString('vi-VN')} VND</span>
            </label>
            <label>
              <input type="radio" className="custom-radio" name="shipping-method" value="ghtk" />
              <span>Giao hàng tiết kiệm (từ 3 - 7 ngày làm việc)</span>
              <span className="order-price">{shippingFee.toLocaleString('vi-VN')} VND</span>
            </label>
          </div>
        </div>

        {/* checkout-payment-method */}
        <div className="checkout-payment-method">
          <p>PHƯƠNG THỨC THANH TOÁN</p>
          <div className="payment-method">
            <label>
              <input type="radio" className="custom-radio" name="payment-option" value="cod" defaultChecked />
              <span>Thanh toán trực tiếp khi nhận hàng</span>
              <span className="material-symbols-outlined payment-icon">
                delivery_truck_speed
              </span>
            </label>
            <label>
              <input type="radio" className="custom-radio" name="payment-option" value="card" />
              <span>Thanh toán bằng Thẻ quốc tế / Thẻ nội địa / QR Code</span>
              <span className="material-symbols-outlined payment-icon">
                credit_card
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* order-summary */}
      <div className="order-summary">
        <h2>ĐƠN HÀNG</h2>

        {/* order-items */}
        <div className="order-items">
          {checkedItems.map(code => {
            const item = userCart.find(item => item.product.code === code);
            return item ? (
              <div key={item.product.id} className="order-item">
                <span className="order-item-details">
                  <span className="order-item-name">{item.product.name}</span>
                  <span className="order-price order-item-quantity">{item.product.price.toLocaleString('vi-VN')} x {item.qty}</span>
                </span>
                <span className="order-price order-item-total">{getItemTotal(item).toLocaleString('vi-VN')} VND</span>
              </div>
            ) : null;
          })}
        </div>

        {/* order-overview-price */}
        <ul className="order-overview-price">
          <li>
            <span>Đơn hàng </span>
            <span className="order-price">{getCheckedTotal().toLocaleString('vi-VN')} VND</span>
          </li>
          <li>
            <span>Giảm </span>
            <span className="order-price">{discount.toLocaleString('vi-VN')} VND</span>
          </li>
          <li className="order-shipping">
            <span>Phí vận chuyển </span>
            <span className="order-price">{shippingFee.toLocaleString('vi-VN')} VND</span>
          </li>
        </ul>

        {/* order-total */}
        <div className="order-total">
          <span>TỔNG CỘNG</span>
          <span className="order-price final-total">{finalTotal.toLocaleString('vi-VN')} VND</span>
        </div>
        <button className="order-btn">HOÀN TẤT ĐẶT HÀNG</button>
      </div>
    </form>
  );
}

export default Checkout;
