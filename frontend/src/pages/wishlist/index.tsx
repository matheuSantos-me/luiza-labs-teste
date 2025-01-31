import { useEffect, useState } from "react";

import { CardComponents, HeaderComponent } from "../../coponents";

import { ProductType } from "../../interfaces";

import "./styles.css";

export const WishlistPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const handleRemoveProduct = (productRemove: ProductType) => {
    const copyProductsWishlist = [...products];

    const findIndexProductExists = copyProductsWishlist.findIndex(
      (product) => product.code === productRemove.code
    );

    copyProductsWishlist.splice(findIndexProductExists, 1);

    localStorage.setItem("@WISHLIST", JSON.stringify(copyProductsWishlist));

    setProducts(copyProductsWishlist);
  };

  useEffect(() => {
    const productsWishlist = localStorage.getItem("@WISHLIST");

    const parseProductsWishlist: ProductType[] = JSON.parse(
      String(productsWishlist)
    );

    setProducts(parseProductsWishlist);
  }, []);

  return (
    <div>
      <HeaderComponent />

      {!products?.length ? (
        <div className="content">
          <span>Sem Produtos na Wishlist!</span>
        </div>
      ) : (
        <div className="list-products-wishlist">
          {products.map((product) => (
            <CardComponents
              key={product.code}
              image={product.image}
              title={product.name}
              rating={product.rating}
              priceInCents={product.priceInCents}
              salePriceInCents={product.salePriceInCents}
              actionRemove={() => handleRemoveProduct(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
