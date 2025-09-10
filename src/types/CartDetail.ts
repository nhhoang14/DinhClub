import Product from "../models/Product";

export type CartDetail = {
  code: string;
  qty: number;
  product: Product;
};