export interface ProductType {
  code: string;
  name: string;
  available: boolean;
  visible: boolean;
  details: {
    name: string;
    description: string;
  };
  priceInCents: string;
  salePriceInCents: string;
  rating: number;
  image: string;
  stockAvailable: boolean;
  wishlist?: boolean;
}
