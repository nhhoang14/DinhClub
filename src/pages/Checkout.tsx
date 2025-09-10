import '../css/Checkout.css';
import { useRef, useState } from "react";
import CartDetail from '../models/CartDetail';
import CartItem from '../models/CartItem';
import { toast } from "react-toastify";
import { useVietnamAddress } from "../hooks/useVietnamAddress";
import QRCode from "react-qr-code";

interface CheckoutProps {
  getCheckedTotal: () => number;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  checkedItems: string[];
  checkedCart: CartDetail[];
  discount: number;
  notifyCheckedItems: () => boolean;
}

function Checkout({ getCheckedTotal, setCart, checkedItems, checkedCart, discount, notifyCheckedItems }: CheckoutProps) {
  const { provinces, districts, wards, handleCityChange, handleDistrictChange } = useVietnamAddress();
  const shippingFee = 50000;
  const finalTotal = getCheckedTotal() - discount + shippingFee;

  const isToastActiveRef = useRef(false);

  function showToast(type: "success" | "warning" | "error" | "info", text: string) {
    if (isToastActiveRef.current) {
      return;
    }
    isToastActiveRef.current = true;
    toast[type](text, {
      onClose: () => {
        isToastActiveRef.current = false;
      }
    });
  }

  const paymentCode = "00020101021138570010A000000727012700069704220113VQRQACUZG42300208QRIBFTTA53037045802VN62150107NPS6869080063043993";
  const [cardCode, setCardCode] = useState<string | null>(null);
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

    const formData = new FormData(e.currentTarget);
    const paymentOption = formData.get("paymentOption")?.toString() || "";

    // Kiểm tra tính hợp lệ của form
    const isValid = e.currentTarget.checkValidity();
    if (!isValid) return;

    // Kiểm tra sản phẩm đã chọn và số lượng
    if (!notifyCheckedItems()) return;

    // Xử lý thanh toán
    if (paymentOption === "card") {
      const code = "DC" + Math.random().toString(36).substring(2, 8).toUpperCase();
      setCardCode(code);
      showToast("info", `Vui lòng quét mã QR để thanh toán. Mã giao dịch: ${code}`);
      return;
    }

    // Thành công
    showToast("success", "Đặt hàng thành công! Cảm ơn bạn đã mua hàng tại Dính Club.");
    setTouched(
      Object.fromEntries(Object.keys(touched).map((field) => [field, false])) as Record<string, boolean>
    );
    e.currentTarget.reset();
    setCardCode(null);

    // Loại các sản phẩm trùng checkedItems khỏi cart
    setCart(prev => prev.filter(item => !checkedItems.includes(item.code)));
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
          {/* input-info */}
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

          {/* address-select */}
          <div className="field-wrapper">
            <select className={`form-control city-select ${touched["city"] ? "" : "untouched"}`}
              name="city"
              onChange={(e) => {
                markTouched("city");
                handleCityChange(e);
              }}
              required
            >
              <option value="">Tỉnh / Thành phố</option>
              {provinces.map(p => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="field-wrapper address-detail-city">
            <select className={`form-control district-select ${touched["district"] ? "" : "untouched"}`}
              name="district"
              onChange={(e) => {
                markTouched("district");
                handleDistrictChange(e);
              }}
              required
            >
              <option value="">Quận / Huyện</option>
              {districts.map(d => (
                <option key={d.code} value={d.code}>{d.name}</option>
              ))}
            </select>
            <select className={`form-control ward-select ${touched["ward"] ? "" : "untouched"}`}
              name="ward"
              onChange={() => markTouched("ward")}
              required
            >
              <option value="">Phường / Xã</option>
              {wards.map(w => (
                <option key={w.code} value={w.code}>{w.name}</option>
              ))}
            </select>
          </div>

          {/* subscribe-checkbox */}
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
              <input type="radio" className="custom-radio" name="shippingMethod" value="ghn" defaultChecked />
              <span>Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc)</span>
              <span className="order-price">{shippingFee.toLocaleString('vi-VN')} VND</span>
            </label>
            <label>
              <input type="radio" className="custom-radio" name="shippingMethod" value="ghtk" />
              <span>Giao hàng tiết kiệm (từ 3 - 7 ngày làm việc)</span>
              <span className="order-price">{shippingFee.toLocaleString('vi-VN')} VND</span>
            </label>
            <label>
              <input type="radio" className="custom-radio" name="shippingMethod" value="ghht" />
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
              <input type="radio" className="custom-radio" name="paymentOption" value="cod" defaultChecked />
              <span>Thanh toán trực tiếp khi nhận hàng</span>
              <span className="material-symbols-outlined payment-icon">
                delivery_truck_speed
              </span>
            </label>
            <label>
              <input type="radio" className="custom-radio" name="paymentOption" value="card" />
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
          {checkedCart.map(item => {
            return item ? (
              <div key={item.product.id} className="order-item">
                <span className="order-item-details">
                  <span className="order-item-name">{item.product.name}</span>
                  <span className="order-price order-item-quantity">{item.product.price.toLocaleString('vi-VN')} x {item.qty}</span>
                </span>
                <span className="order-price order-item-total">{item.totalPrice.toLocaleString('vi-VN')} VND</span>
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
        {cardCode && (
          <div className="card-code-box">
            <span>Mã giao dịch của bạn: <b>{cardCode}</b></span>
            <div style={{ margin: "16px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", backgroundColor: "white", padding: "16px", borderRadius: "8px" }}>
              <QRCode value={paymentCode} size={160} bgColor="#fff" fgColor="#0B70FE" />
              <span>Quét mã QR để thanh toán qua thẻ hoặc ví điện tử</span>
              <span>Nhập mã giao dịch <b>{cardCode}</b> vào nội dung thanh toán</span>
            </div>
          </div>
        )}
        <button className="order-btn">HOÀN TẤT ĐẶT HÀNG</button>
      </div>
    </form>
  );
}

export default Checkout;
