import { ProductType } from "../../interfaces";

export interface ProductsDataType {
  message: string;
  total: number;
  pageSize: number;
  totalPages: number;
  products: ProductType[];
}
