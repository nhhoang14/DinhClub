import Discount from '../models/Discount';
import { CartDetail } from '../types/CartDetail';

export function useDiscount(discounts: Discount[]) {
    const getDiscountByCode = (code: string): Discount | null => {
        const discount = discounts.find(d => d.code === code);
        return discount || null;
    };

    const applyDiscount = (CartDetails: CartDetail[], discount: Discount): number => {
        const Cart : CartDetail[] = CartDetails.filter(item => item.product.type === discount.apply);
        if (!Cart) return 0;

        const subtotal = Cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);
        if (subtotal < discount.minSubtotal) return 0;
        if (discount.type === 'fixed') return discount.value;
        return Math.min(subtotal * (discount.value / 100), discount.maxDiscount);
    }

    return {
        getDiscountByCode,
        applyDiscount
    };
}