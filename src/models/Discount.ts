export default class Discount {
  code: string;
  type: 'fixed' | 'percentage';
  value: number;
  apply: string;
  minSubtotal: number;
  maxDiscount: number;

  constructor(
    code: string,
    type: 'fixed' | 'percentage',
    value: number,
    apply: string,
    minSubtotal: number,
    maxDiscount: number
  ) {
    this.code = code;
    this.type = type;
    this.value = value;
    this.apply = apply;
    this.minSubtotal = minSubtotal;
    this.maxDiscount = maxDiscount;
  }

  applyDiscount(cartTotal: number) {
    if (cartTotal < this.minSubtotal) {
      throw new Error("Giá trị đơn hàng không đủ điều kiện áp dụng mã giảm giá.");
    }
    let discount = 0;
    if (this.type === 'fixed') {
      discount = this.value;
    } else if (this.type === 'percentage') {
      discount = cartTotal * this.value / 100;
    }
    return Math.min(discount, this.maxDiscount);
  }
}