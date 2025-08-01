export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: {
    quantity: number;
    inStock: boolean;
  };
  category: string;
  status: "active" | "inactive";
  image: string;
}
