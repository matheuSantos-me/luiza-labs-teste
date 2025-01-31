import { FC } from "react";
import { Heart, X, Star } from "lucide-react";

import { formatCurrency } from "../../utils/formatCurrency";

import { CardComponentsType } from "./interfaces";

import "./styles.css";

export const CardComponents: FC<CardComponentsType> = ({
  wishlist,
  image,
  title,
  rating,
  priceInCents,
  salePriceInCents,
  actionLike,
  actionRemove,
}) => {
  return (
    <div className="container-card">
      <div>
        <header className="container-header-action">
          {actionLike && (
            <button
              className="button-like"
              style={{ background: wishlist ? "#ff0000" : "#ccc" }}
              onClick={actionLike}
            >
              <Heart color="#fff" />
            </button>
          )}

          {actionRemove && (
            <button className="button-remove" onClick={actionRemove}>
              <X />
            </button>
          )}
        </header>

        <img src={image} className="card-image" alt="Logo" />

        <span className="text-title">{title}</span>
      </div>

      <div>
        <div className="container-rating">
          <div>
            {[...Array(5)].map((_, index) => (
              <Star key={index} color={rating > index ? "#FFD700" : "#ccc"} />
            ))}
          </div>

          <p className="text-rating">{rating}</p>
        </div>

        <p className="text-price">{formatCurrency(Number(priceInCents))}</p>

        <span className="text-sale-price">
          {formatCurrency(Number(salePriceInCents))}
        </span>
      </div>
    </div>
  );
};
