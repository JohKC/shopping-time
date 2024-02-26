import { AttributeItem } from "./AttributeItem";

export interface Attribute {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
}
