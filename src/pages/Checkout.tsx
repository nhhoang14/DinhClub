import '../css/Checkout.css';
import { useState } from "react";
import { CartDetail } from '../models/CartDetail';

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

  const [touched, setTouched] = useState<Record<string, boolean>>({
    name: false,
    phone: false,
    email: false,
    address: false,
    city: false,
    district: false,
    ward: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(
      Object.fromEntries(Object.keys(touched).map((field) => [field, true])) as Record<string, boolean>
    );

    const isValid = e.currentTarget.checkValidity();
    if (!isValid) {
      const firstInvalid = e.currentTarget.querySelector(
        'input:invalid, select:invalid'
      ) as HTMLElement | null;
      firstInvalid?.focus();
      return;
    } else {
      if (checkedItems.length === 0) {
        alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng");
        return;
      } else {
        alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng tại Dính Club.");
        window.location.reload();
      }
    }
  };

  const markTouched = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const keyboardHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      input.value = input.value.trim().replace(/\s+/g, " ");
      input.blur();
    }
  };

  return (
    <form className="checkout-container" onSubmit={handleSubmit} noValidate>
      {/* checkout-main */}
      <div className="checkout-main">
        {/* shipping-info */}
        <div className="shipping-info">
          <p>THÔNG TIN GIAO HÀNG</p>
          <div
            className={`field-wrapper ${touched["name"] ? "" : "untouched"}`}
            data-error="Vui lòng nhập họ tên"
          >
            <input className="form-control"
              style={{ textTransform: 'capitalize' }}
              type="text"
              name="name"
              placeholder="Họ và tên"
              onKeyDown={keyboardHandler}
              onInput={
                (e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-ZÀ-ỹ' \s]/g, "");
                  markTouched("name");
                }
              }
              required
            />
          </div>
          <div
            className={`field-wrapper ${touched["phone"] ? "" : "untouched"}`}
            data-error="Vui lòng nhập số điện thoại"
          >
            <input className="form-control"
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              onKeyDown={keyboardHandler}
              onInput={
                (e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                  markTouched("phone");
                }
              }
              pattern="[0]+[35789]+[0-9]{8}"
              required
            />
          </div>
          <div
            className={`field-wrapper ${touched["email"] ? "" : "untouched"}`}
            data-error="Vui lòng nhập email"
          >
            <input className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              onKeyDown={keyboardHandler}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z0-9@._%+-]/g, "");
                markTouched("email");
              }}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+$"
              required
            />
          </div>
          <div
            className={`field-wrapper ${touched["address"] ? "" : "untouched"}`}
            data-error="Vui lòng nhập địa chỉ"
          >
            <input className="form-control"
              type="text"
              name="address"
              placeholder="Địa chỉ"
              onKeyDown={keyboardHandler}
              onInput={
                (e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^\p{L}0-9,./\s]/gu, "");
                  markTouched("address");
                }
              }
              required
            />
          </div>
          <div className="field-wrapper">
            <select className={`form-control city-select ${touched["city"] ? "" : "untouched"}`}
              name="city"
              onChange={() => markTouched("city")}
              required
            >
              <option value="">Tỉnh / Thành phố</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP.HCM">TP.HCM</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>
          </div>
          <div className="field-wrapper address-detail-city">
            <select className={`form-control district-select ${touched["district"] ? "" : "untouched"}`}
              name="district"
              onChange={() => markTouched("district")}
              required
            >
              <option value="">Quận / Huyện</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP.HCM">TP.HCM</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>
            <select className={`form-control ward-select ${touched["ward"] ? "" : "untouched"}`}
              name="ward"
              onChange={() => markTouched("ward")}
              required
            >
              <option value="">Phường / Xã</option>
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
              <input type="radio" className="custom-radio" name="shipping-method" value="ghn" defaultChecked />
              <span>Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc)</span>
              <span className="order-price">{shippingFee.toLocaleString('vi-VN')} VND</span>
            </label>
            <label>
              <input type="radio" className="custom-radio" name="shipping-method" value="ghtk" />
              <span>Giao hàng tiết kiệm (từ 3 - 7 ngày làm việc)</span>
              <span className="order-price">{shippingFee.toLocaleString('vi-VN')} VND</span>
            </label>
            <label>
              <input type="radio" className="custom-radio" name="shipping-method" value="ghht" />
              <span>Hỏa tốc (từ 1 - 3 ngày làm việc)</span>
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
