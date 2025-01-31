import { useEffect, useState } from "react";
import axios from "axios";

import { CardComponents, HeaderComponent } from "../../coponents";
import { ProductType } from "../../interfaces";
import { ProductsDataType } from "./interfaces";

import "./styles.css";

export const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getWishlistProducts = (): ProductType[] => {
    setLoading(true);

    try {
      const wishlist = localStorage.getItem("@WISHLIST");
      return wishlist ? JSON.parse(wishlist) : [];
    } catch {
      return [];
    }
  };

  const getListProducts = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get<ProductsDataType>(
        "http://localhost:3333/products"
      );

      const productsWishlist = localStorage.getItem("@WISHLIST");

      const parseProductsWishlist: ProductType[] = JSON.parse(
        String(productsWishlist)
      );

      if (parseProductsWishlist) {
        const mergedProducts = data.products.map((product) => {
          const wishlistItem = parseProductsWishlist.find(
            (wishlistProduct) => wishlistProduct.code === product.code
          );

          return wishlistItem ? { ...product, wishlist: true } : product;
        });

        setProducts(mergedProducts);
      } else {
        setProducts(data.products);
      }
    } catch (e) {
      alert("Error ao buscar produtos!");
    } finally {
      setLoading(false);
    }
  };

  const handleLikeProduct = (productLike: ProductType) => {
    const productsWishlist = localStorage.getItem("@WISHLIST");

    const parseProductsWishlist: ProductType[] = JSON.parse(
      String(productsWishlist)
    );

    const copyProducts = [...products];
    const copyProductsWishlist = parseProductsWishlist
      ? [...parseProductsWishlist]
      : [];

    const findIndexProduct = copyProducts.findIndex(
      (product) => product.code === productLike.code
    );

    const findIndexProductWishlist = copyProductsWishlist.findIndex(
      (product) => product.code === productLike.code
    );

    if (findIndexProductWishlist < 0) {
      copyProducts.splice(findIndexProduct, 1, {
        ...productLike,
        wishlist: true,
      });

      copyProductsWishlist.push({ ...productLike, wishlist: true });

      localStorage.setItem("@WISHLIST", JSON.stringify(copyProductsWishlist));

      setProducts(copyProducts);
    } else {
      copyProducts.splice(findIndexProduct, 1, {
        ...productLike,
        wishlist: false,
      });

      copyProductsWishlist.splice(findIndexProductWishlist, 1);

      localStorage.setItem("@WISHLIST", JSON.stringify(copyProductsWishlist));

      setProducts(copyProducts);
    }
  };

  useEffect(() => {
    getListProducts();
  }, []);

  if (loading) {
    return (
      <div className="content">
        <span>Carregando...</span>;
      </div>
    );
  }

  return (
    <div>
      <HeaderComponent />

      {!products ? (
        <div className="content">
          <span>No Data</span>
        </div>
      ) : (
        <div className="list-products">
          {products.map((product) => (
            <CardComponents
              key={product.code}
              wishlist={product.wishlist}
              image={product.image}
              title={product.name}
              rating={product.rating}
              priceInCents={product.priceInCents}
              salePriceInCents={product.salePriceInCents}
              actionLike={() => handleLikeProduct(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
