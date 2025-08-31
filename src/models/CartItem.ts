import Product from "./Product";

export default class CartItem {
  code: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  qty: number;
  total: number;

  constructor(product: Product, qty: number);
  constructor(cartItem: CartItem, qty: number);

  constructor(item: Product | CartItem, qty: number) {
    const source = item instanceof Product ? item : item;
    this.code = source.code;
    this.name = source.name;
    this.price = source.price;
    this.stock = source.stock;
    this.image = source.image;

    this.qty = qty;
    this.total = this.price * this.qty;
  }
}
