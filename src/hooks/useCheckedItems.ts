import { useEffect, useState } from "react";
import { CartDetail } from "../types/CartDetail";
import { useShowToast } from "./useShowToast";

type UseCheckedItemsResult = {
  cartDetails: CartDetail[];
  getItemTotal: (item: CartDetail) => number;
};

export function useCheckedItems({ cartDetails, getItemTotal }: UseCheckedItemsResult) {
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
      .reduce((total, item) => total + getItemTotal(item), 0);
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

  return { checkedItems, setCheckedItems, getCheckedTotal, notifyCheckedItems };
}