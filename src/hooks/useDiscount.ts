import Discount from '../models/Discount';
import CartDetail from '../models/CartDetail';

export function useDiscount(discounts: Discount[], CheckedCart: CartDetail[]) {
    const getDiscountByCode = (code: string | null): Discount | null => {
        const discount = discounts.find(d => d.code === code);
        return discount || null;
    };

    const applyDiscount = (discount: Discount | null): number => {
        if (!discount) return 0;
        return discount.calculate(CheckedCart);
    };

    return {
        getDiscountByCode,
        applyDiscount
    };
}