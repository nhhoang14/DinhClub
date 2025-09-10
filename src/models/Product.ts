export default class Product {
  constructor(
    public id: number,
    public image: string,
    public hoverImage: string | null,
    public name: string,
    public type: string,
    public code: string,
    public stock: number = 0,
    public price: number,
    public color: string
  ) {}
}
