export default class CartItem {
  code: string;
  qty: number;

  constructor(code: string, qty: number) {
    this.code = code;
    this.qty = qty;
  }
}
