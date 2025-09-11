export type ShippingFee = {
  cityID: string;
  ghn: number;
  ghtk: number;
  ghht: number;
};

export type ShippingMethod = Exclude<keyof ShippingFee, "cityID">;