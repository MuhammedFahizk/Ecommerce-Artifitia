import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../components/common/Breadcrumb";
import { Button, Div, Modal, Text } from "../components/common/Index";
import { getProduct } from "../services/getApi";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { AddProduct } from "../components/ui/AddProduct";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProduct(id);
        setProduct(response.data);
        setSelectedVariant(response.data?.variants[0]);
        setPrice(response.data?.variants[0]?.price);
      } catch (err) {
        setError("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageClick = (index) => setSelectedImageIndex(index);
  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
    setPrice(variant.price);
  };

  const handleQuantityChange = (action) => {
    setQuantity((prev) => (action === "increase" ? prev + 1 : prev > 1 ? prev - 1 : prev));
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <Div className="justify-between space-y-5 pt-10 px-20 h-[80px] items-center">
      <Breadcrumb />
      <Div className="grid grid-cols-2">
        {/* Main Image */}
        <Div className="px-5">
          <Div className="flex justify-center items-center p-2 rounded-lg border border-gray-300">
            <img
              src={product?.images[selectedImageIndex]?.url}
              className="w-[400px] h-[250px] object-cover rounded-lg"
              alt="Selected product"
            />
          </Div>

          {/* Bottom Image Thumbnails */}
          <Div className="flex justify-between items-center space-x-3 mt-5">
            {product?.images.map((image, index) => (
              <Div key={index} className="w-1/2 border rounded-lg p-2 flex justify-center">
                <img
                  src={image?.url}
                  className={`w-[100px] h-[80px] object-cover cursor-pointer rounded-lg ${
                    selectedImageIndex === index ? "border-4 border-blue-500" : ""
                  }`}
                  alt={`Product image ${index}`}
                  onClick={() => handleImageClick(index)}
                />
              </Div>
            ))}
          </Div>
        </Div>

        {/* Product Information */}
        <Div className="px-4 p-2 space-y-2">
          <Text className="text-lg text-primary font-bold">{product?.productName}</Text>
          <Text className="text-md font-bold text-primary">${price}</Text>
          <Text className="text-sm items-center h-fit text-primary flex font-bold">
            Availability:{" "}
            {product?.variants.length > 0 ? (
              <span className="text-green-500 flex justify-center items-center h-full text-sm font-semibold">
                <IoIosCheckmark className="text-sm" /> In Stock
              </span>
            ) : (
              <span className="text-red-500 flex justify-center items-center h-full text-sm font-semibold">
                <IoIosClose className="text-xl" /> Out of Stock
              </span>
            )}
          </Text>
          <Text className="text-xs text-primary">Hurry up! only 34 products left in stock!</Text>
          <hr className="my-10" />

          {/* Variant Buttons */}
          <Div className="flex gap-2 mt-4 items-center h-fit">
            <Text className="text-sm text-gray-500">Ram:</Text>
            {product?.variants.map((variant, index) => (
              <Button
                key={index}
                className={`bg-[#eeeeee] px-4 py-1 rounded-lg ${
                  selectedVariant === variant ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => handleVariantClick(variant)}
              >
                {variant?.ram}
              </Button>
            ))}
          </Div>

          {/* Quantity Buttons */}
          <Div>
            <Text className="text-sm">Quantity:</Text>
            <Div className="flex items-center gap-0">
              <Button className="bg-gray-300 px-2 py-1 border" onClick={() => handleQuantityChange("decrease")}>
                -
              </Button>
              <Text className="bg-gray-300 w-6 px-1 h-8 items-center text-center ">{quantity}</Text>
              <Button className="bg-gray-300 px-2 py-1 border" onClick={() => handleQuantityChange("increase")}>
                +
              </Button>
            </Div>

            <Div className="px-10 text-white flex gap-3 p-5">
              <Button className="bg-secondary px-4 rounded-2xl p-2" onClick={handleModalOpen}>
                Edit Product
              </Button>
              <Modal isOpen={isModalOpen} onClose={handleModalClose} width="max-w-2xl">
                <AddProduct productData={product} />
              </Modal>

              <Button className="bg-secondary px-4 rounded-2xl p-2">Buy it now</Button>

              <Button className="bg-btn px-3 rounded-full p-2">
                <CiHeart className="text-xl text-black" />
              </Button>
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};
