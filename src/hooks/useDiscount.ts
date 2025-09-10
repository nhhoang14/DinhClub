import { useState, useEffect } from 'react';
import Discount from '../models/Discount';
import CartDetail from '../models/CartDetail';

export function useDiscount(discounts: Discount[], CheckedCart: CartDetail[]) {
    const [lastVoucher, setLastVoucher] = useState<string | null>(null);
    const [discount, setDiscount] = useState<number>(0);

    const getDiscountByCode = (code: string | null): Discount | null => {
        const discount = discounts.find(d => d.code === code);
        return discount || null;
    };

    const applyDiscount = (discount: Discount | null): number => {
        if (!discount) return 0;
        return discount.calculate(CheckedCart);
    };
    
    useEffect(() => {
        if (lastVoucher && getDiscountByCode(lastVoucher)) {
            setDiscount(applyDiscount(getDiscountByCode(lastVoucher)));
        } else {
            setDiscount(0);
        }
    }, [CheckedCart, lastVoucher]);

    return {
        getDiscountByCode,
        setLastVoucher,
        discount
    };
}