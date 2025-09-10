import Product from "../models/Product";
import CartDetail from "../models/CartDetail";

// Sắp xếp các mặt hàng trong giỏ hàng
export function sortCartItems(cart: CartDetail[]): CartDetail[] {
  return cart.slice().sort((a, b) => {
    const stockA = a.product?.stock ?? 0;
    const stockB = b.product?.stock ?? 0;
    if (stockA > 0 && stockB <= 0) return -1;
    if (stockA <= 0 && stockB > 0) return 1;
    return 0;
  });
}

// Gợi ý sản phẩm chưa có trong giỏ
export function filterRecommend(products: Product[], cartDetails: CartDetail[]): Product[] {
  return products.filter(
    p => p.stock > 0 && !cartDetails.some(c => c.code === p.code)
  );
}

// Ưu tiên sản phẩm còn hàng trong danh sách
export function sortProducts(products: Product[]): Product[] {
  return products.slice().sort((a, b) => {
    if (a.stock > 0 && b.stock <= 0) return -1;
    if (a.stock <= 0 && b.stock > 0) return 1;
    return 0;
  });
}
