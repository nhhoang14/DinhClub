export default class Product {
  id: number;
  image: string;
  hoverImage: string | null;
  name: string;
  type: string;
  code: string;
  stock: number;
  price: number;
  color: string;

  constructor(
    id: number,
    image: string,
    hoverImage: string | null,
    name: string,
    type: string,
    code: string,
    stock: number = 0,
    price: number,
    color: string
  ) {
    this.id = id;
    this.image = image;
    this.hoverImage = hoverImage;
    this.name = name;
    this.type = type;
    this.code = code;
    this.stock = stock;
    this.price = price;
    this.color = color;
  }
}
