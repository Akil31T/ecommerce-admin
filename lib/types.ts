
export interface TInventory {
  quantity: number;
  inStock: boolean;
}
export interface TVariant {
  type: string;
  value: string;
}

export interface Product {
  name: string;
  _id: string;
  image?: string;
  status?: string;
  stock?: number;
  description?: string;
  price: string; // to be converted to number before submission
  category: string;
  tags: string[]; // usually strings entered via tag input
  variants: TVariant[];
  inventory: TInventory;
  quantity: string; // to be converted to number
  inStock: boolean;
};    
