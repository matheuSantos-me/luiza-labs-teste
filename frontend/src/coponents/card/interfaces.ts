export interface CardComponentsType {
  wishlist?: boolean;
  image: string;
  title: string;
  rating: number;
  priceInCents: string;
  salePriceInCents: string;
  actionLike?: () => void;
  actionRemove?: () => void;
}
