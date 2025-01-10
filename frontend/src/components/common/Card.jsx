import { Link } from "react-router-dom";
import { Button, Div, Text } from "./Index";
import { FcRemoveImage } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import { AddToCart } from "../../services/postApi";
import { useState } from "react";

export const Card = ({ product, cart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const isProductInCart = cart.some(item => item.product.toString() === product._id);

  const handleAddToCart = async () => {
    try {
      const response = await AddToCart(product._id);
      console.log("Product added to cart:", response);
      setIsAdded(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <Div
      className="flex cursor-pointer flex-col items-center h-full justify-center rounded-xl p-2 border"
    >
      <Div className="w-full flex px-5 justify-end">
        <Button
          onClick={handleAddToCart}
          className={`${
            isProductInCart || isAdded ? "bg-red-500" : "bg-[#B3D4E5]"
          } rounded-full p-2 ${isProductInCart || isAdded ? "cursor-not-allowed" : ""}`}
          disabled={isProductInCart || isAdded}
        >
          <CiHeart className="text-md text-black" />
        </Button>
      </Div>
      <Link to={`/product/${product._id}`}>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]?.url}
            className="object-cover rounded-lg mx-4 w-3/4 h-36"
            alt={product.productName}
          />
        ) : (
          <Div className="flex justify-center items-center w-3/4 h-36">
            <FcRemoveImage className="text-gray-400 text-6xl" />
          </Div>
        )}

        <Div className="justify-items-start space-y-2 w-full">
          <Text className="mt-2 text-sm font-semibold text-left">
            {product.productName}
          </Text>
          <Text className="text-sm text-primary text-left">
            ${product?.variants[0]?.price}
          </Text>
        </Div>
      </Link>
    </Div>
  );
};
