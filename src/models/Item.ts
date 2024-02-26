import { AttributeItem } from "./AttributeItem";
import { Attribute } from "./AttributeSet";
import { Price } from "./Price";

export interface Item {
  id: string;
  name: string;
  brand: string;
  gallery: string[];
  inStock: boolean;
  prices: Price[];
  description: string;
  category: string;
  attributes: Attribute[];
  isSelected?: boolean;
  quantity?: number;
  userSelectedAttributes?: AttributeItem[];
  uniqueId?: string;
}
