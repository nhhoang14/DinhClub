// src/hooks/useCart.ts
import { useState, useMemo } from "react";
import Product from "../models/Product";
import CartItem from "../models/CartItem";
import { CartDetail } from "../models/CartDetail";

export function useCart(products: Product[]) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // chi tiết cart (gắn product cho từng CartItem)
  const cartDetails: CartDetail[] = useMemo(() => {
    const productMap = new Map(products.map(p => [p.code, p]));
    return cart
      .map(item => {
        const product = productMap.get(item.code);
        if (!product) return null;
        return {
          ...item,
          product: product,
        } as CartDetail;
      })
      .filter((item): item is CartDetail => item !== null);
  }, [cart, products]);

  // thêm sản phẩm
  const addToCart = (product: Product, qty: number) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.code === product.code);
      if (idx >= 0) {
        const updated = [...prev];
        const newQty = updated[idx].qty + qty;
        if (newQty <= product.stock) {
          updated[idx] = new CartItem(product.code, newQty);
          return updated;
        } else {
          const max = product.stock - updated[idx].qty;
          if (max > 0) alert(`Bạn chỉ có thể thêm tối đa ${max} sản phẩm nữa`);
          else alert("Sản phẩm đã đạt số lượng tối đa trong giỏ hàng");
          return prev;
        }
      } else if (product.stock > 0) {
        return [new CartItem(product.code, Math.min(qty, product.stock)), ...prev];
      } else {
        alert("Sản phẩm đã hết hàng");
        return prev;
      }
    });
  };

  // xoá sản phẩm
  const removeFromCart = (code: string) => {
    setCart(prev => prev.filter(item => item.code !== code));
  };

  // cập nhật số lượng
  const updateQty = (code: string, qty: number) => {
    setCart(prev =>
      prev.map(item =>
        item.code === code ? new CartItem(item.code, qty) : item
      ).filter(item => item.qty > 0)
    );
  };

  // tính tổng tiền 1 item
  const getItemTotal = (item: CartItem) => {
    const product = products.find(p => p.code === item.code);
    return product ? product.price * item.qty : 0;
  };

  return { cartDetails, addToCart, removeFromCart, updateQty, getItemTotal };
}
