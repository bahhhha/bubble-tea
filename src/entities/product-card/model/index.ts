export interface Product {
  id: string;
  name: string;
  flavor: string;
  description: string;
  retailPrice: number;
  price150k: number;
  price200k: number;
  category: string;
  quantity: number;
  weight: string;
  packsPerBox: number;
  origin: string;
  image: string;
  tags: string[];
}
