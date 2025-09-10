import CartDetail from './CartDetail';

export default class Discount {
  constructor(
    public id: number,
    public code: string,
    public type: 'fixed' | 'percentage',
    public value: number,
    public apply: string,
    public minSubtotal: number,
    public maxDiscount: number
  ) { }

  calculate(cart: CartDetail[]): number {
    const filteredCart = this.apply === "all"
      ? cart
      : cart.filter(item => item.product.type === this.apply);
    const subtotal = filteredCart.reduce((acc, item) => acc + item.totalPrice, 0);

    if (subtotal < this.minSubtotal) return 0;

    const discountAmount =
      this.type === 'fixed'
        ? this.value
        : (subtotal * this.value) / 100;

    return Math.min(discountAmount, this.maxDiscount);
  }
}
