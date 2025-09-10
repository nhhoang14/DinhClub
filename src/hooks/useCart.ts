import { useRef, useState, useMemo, useEffect } from "react";
import Product from "../models/Product";
import CartItem from "../models/CartItem";
import CartDetail from "../models/CartDetail";
import Cookies from 'js-cookie'
import { toast } from "react-toastify";

const CART_COOKIE_KEY = 'user_cart';

type MsgType = "success" | "error" | "warning";

export function useCart(products: Product[]) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const activeToastRef = useRef<{ type: "success" | "error" | "warning" } | null>(null);
  const currentCodeRef = useRef<string | null>(null);

  const resetLastCode = () => {
    currentCodeRef.current = null;
  }

  const enqueueMsg = (msg: { type: MsgType; text: string }, productCode?: string) => {
    if (msg.type === "success") {
      // chỉ hiện khi khác product
      if (!currentCodeRef.current) {
        currentCodeRef.current = productCode || "";
        toast.success(msg.text, {
          onClose: () => {
            activeToastRef.current = null;
          },
        });
      }
      return;
    }

    if (!activeToastRef.current || activeToastRef.current.type !== msg.type) {
      toast[msg.type](msg.text, {
        onClose: () => {
          activeToastRef.current = null;
        },
      });
      activeToastRef.current = { type: msg.type };
    }
  };

  // lưu cart vào cookie
  useEffect(() => {
    const savedCart = Cookies.get(CART_COOKIE_KEY);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart) as { code: string; qty: number }[];
        setCart(parsed.map((item) => new CartItem(item.code, item.qty)));
      } catch {
        // nếu parse lỗi thì clear cookie
        Cookies.remove(CART_COOKIE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    Cookies.set(CART_COOKIE_KEY, JSON.stringify(cart), { expires: 7, path: "/" });
  }, [cart]);

  // gắn Product cho từng CartItem → CartDetail
  const cartDetails: CartDetail[] = useMemo(() => {
    const productMap = new Map(products.map(p => [p.code, p]));
    return cart
      .map(item => {
        const product = productMap.get(item.code);
        return product ? new CartDetail(item.code, item.qty, product) : null;
      })
      .filter((item): item is CartDetail => item !== null);
  }, [cart, products]);

  // thêm sản phẩm
  const addToCart = (product: Product, qty: number) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.code === product.code);
      let updated = [...prev];

      // sản phẩm có trong giỏ
      if (idx >= 0) {
        const newQty = updated[idx].qty + qty;
        updated[idx] = new CartItem(product.code, Math.min(newQty, product.stock));

        if (newQty > product.stock) {
          enqueueMsg(
            product.stock > 0
              ? { type: "warning", text: "Sản phẩm đã đạt số lượng tối đa trong giỏ hàng" }
              : { type: "error", text: "Sản phẩm đã hết hàng" },
            product.code
          );
        } else {
          enqueueMsg({ type: "success", text: "Đã thêm vào giỏ hàng" }, product.code);
        }
        return updated;
      }

      // sản phẩm chưa có trong giỏ
      if (product.stock > 0) {
        enqueueMsg(
          qty > product.stock
            ? { type: "warning", text: "Sản phẩm đã đạt số lượng tối đa trong giỏ hàng" }
            : { type: "success", text: "Đã thêm vào giỏ hàng" }
          , product.code
        );
        return [new CartItem(product.code, Math.min(qty, product.stock)), ...prev];
      }

      // sản phẩm đã hết hàng
      enqueueMsg({ type: "error", text: "Sản phẩm đã hết hàng" }, product.code);
      return prev;
    });
  };

  // xoá sản phẩm
  const removeFromCart = (code: string) => {
    setCart(prev => prev.filter(item => item.code !== code));
  };

  // cập nhật số lượng
  const updateQty = (code: string, qty: number) => {
    setCart(prev =>
      prev
        .map(item => (item.code === code ? new CartItem(item.code, qty) : item))
        .filter(item => item.qty > 0)
    );
  };

  return {
    setCart,
    cartDetails,
    addToCart,
    removeFromCart,
    updateQty,
    resetLastCode,
  };
}
