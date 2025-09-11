import { useMemo } from "react";
import { ShippingFee } from "../types/typeShippingFee";

const shippingFees: ShippingFee[] = [
  { cityID: "", ghn: 0, ghtk: 0, ghht: 0 },
  { cityID: "1", ghn: 25000, ghtk: 15000, ghht: 50000 },
  { cityID: "79", ghn: 30000, ghtk: 20000, ghht: 60000 },
];

export function useShippingFee(cityID: string) : ShippingFee {
  return useMemo(() => {
    const found = shippingFees.find((fee) => fee.cityID === cityID);
    return (
      found || {
        cityID,
        ghn: 40000,
        ghtk: 25000,
        ghht: 80000,
      }
    );
  }, [cityID]);
}
