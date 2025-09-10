export default class Discount {
  id: number;
  code: string;
  type: 'fixed' | 'percentage';
  value: number;
  apply: string;
  minSubtotal: number;
  maxDiscount: number;

  constructor(
    id: number,
    code: string,
    type: 'fixed' | 'percentage',
    value: number,
    apply: string,
    minSubtotal: number,
    maxDiscount: number
  ) {
    this.id = id;
    this.code = code;
    this.type = type;
    this.value = value;
    this.apply = apply;
    this.minSubtotal = minSubtotal;
    this.maxDiscount = maxDiscount;
  }
}