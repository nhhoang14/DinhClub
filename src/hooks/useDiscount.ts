import { useState, useEffect, useCallback } from "react";
import Discount from "../models/Discount";
import CartDetail from "../models/CartDetail";

export function useDiscount(discounts: Discount[], checkedCart: CartDetail[]) {
    const [voucherCode, setVoucherCode] = useState<string | null>(null);
    const [discountValue, setDiscountValue] = useState<number>(0);

    const getDiscountByCode = useCallback(
        (code: string | null): Discount | null =>
            discounts.find(d => d.code === code) || null,
        [discounts]
    );

    const applyDiscount = (discount: Discount | null): number =>
        discount ? discount.calculate(checkedCart) : 0;

    useEffect(() => {
        setDiscountValue(applyDiscount(getDiscountByCode(voucherCode)));
    }, [voucherCode, checkedCart, getDiscountByCode]);

    return {
        discountValue,
        setVoucherCode,
        getDiscountByCode
    };
}
