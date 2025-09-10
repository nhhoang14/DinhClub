import Product from "./Product";

export default class CartDetail {
  constructor(
    public code: string,
    public qty: number,
    public product: Product
  ) {}

  get totalPrice(): number {
    return this.product.price * this.qty;
  }
};