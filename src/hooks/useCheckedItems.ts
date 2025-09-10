import { useEffect, useState, useMemo } from "react";
import CartDetail from "../models/CartDetail";
import { useShowToast } from "./useShowToast";

export function useCheckedItems(cartDetails: CartDetail[]) {
  const [checkedItems, setCheckedItems] = useState<string[]>(
    cartDetails.map(item => item.code)
  );

  useEffect(() => {
    setCheckedItems(prev =>
      prev.filter(code => cartDetails.some(item => item.code === code))
    );
  }, [cartDetails]);

  const showToast = useShowToast();

  const getCheckedTotal = () => {
    return cartDetails
      .filter(item => checkedItems.includes(item.code))
      .reduce((total, item) => total + item.totalPrice, 0);
  };

  const notifyCheckedItems = (): boolean => {
    if (checkedItems.length === 0) {
      showToast("warning", "Vui lòng chọn ít nhất một sản phẩm để tiếp tục thanh toán");
      return false;
    } else if (
      cartDetails
        .filter(item => checkedItems.includes(item.code))
        .some(item => item.product.stock === 0 || item.qty > item.product.stock)
    ) {
      showToast("warning", "Kiểm tra lại số lượng sản phẩm trong giỏ hàng");
      return false;
    }
    return true;
  };

  const checkedCart = useMemo(
    () => cartDetails.filter(item => checkedItems.includes(item.code)),
    [cartDetails, checkedItems]
  );

  return { checkedCart, checkedItems, setCheckedItems, getCheckedTotal, notifyCheckedItems };
}