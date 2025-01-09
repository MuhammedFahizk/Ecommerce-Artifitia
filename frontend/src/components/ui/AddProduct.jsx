// AddProduct.js
import { useForm } from "react-hook-form";
import { Div, InputField, Notification, Text } from "../common/Index";
import { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { Variant } from "../specific/Variant";
import {  getSubCategory } from "../../services/getApi";
import { addProduct } from "../../services/postApi";

export const AddProduct = ({closeModal}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();

  const [imageInputs, setImageInputs] = useState([0]);
  const [imagePreviews, setImagePreviews] = useState([null]);
  const [variants, setVariants] = useState([]); // State for variants
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState({
    isVisible: false,
    type: "",
    message: "",
  });
  const onSubmit =async (data) => {
        console.log(variants);
        data.variants = variants
    try {
        const response = await addProduct(data);
        console.log(response);
        showNotification("success", "Sub Category added successfully!");
        reset();
        closeModal();
      } catch (error) {
        const errorMessage =
          error?.message.cause || "An unexpected error occurred.";
        console.error(errorMessage);
        showNotification("error", errorMessage);
      }
  };

  const showNotification = (type, message) => {
    setNotification({ isVisible: true, type, message });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getSubCategory();
        setCategories(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
        showNotification("error", "Failed to fetch categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleAddImageField = () => {
    setImageInputs((prevInputs) => [...prevInputs, prevInputs.length]);
    setImagePreviews((prevPreviews) => [...prevPreviews, null]);
  };

  const handleImageUpload = (e, index) => {
    const files = e.target.files;
    if (files.length) {
      const fileArray = Array.from(files);
      setValue(`images[${index}]`, fileArray);

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => {
        const updatedPreviews = [...prevPreviews];
        updatedPreviews[index] = previewUrls[0];
        return updatedPreviews;
      });

      if (index === imageInputs.length - 1) {
        handleAddImageField();
      }
    }
  };

  return (
    <Div className="flex flex-col items-center w-full">
      <h1 className="text-2xl font-semibold mb-2">Add Product</h1>
      {notification.isVisible && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
        encType="multipart/form-data"
      >
        {/* Product Name Input */}
        <Div className="flex w-full items-center justify-between gap-2">
          <Text className="w-1/4 text-gray-500">Title : </Text>
          <InputField
            type="text"
            placeholder="Product Name"
            register={register}
            name="productName"
            validation={{
              required: "Product Name is required",
            }}
            errors={errors}
            className="w-full"
          />
        </Div>

        {/* Category Dropdown */}
        <Div className="flex w-full items-center justify-between gap-4">
          <Text className="w-1/4 text-gray-500">Sub Category :</Text>
          <select
            className={`input bg-info w-full ${errors.category ? "input-error" : ""}`}
            {...register("subCategory", {
              required: "Please select a category",
            })}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </Div>

        {/* Variant Section */}
        <Variant onChange={setVariants} />

        {/* Description Input */}
        <Div className="flex w-full items-center justify-between gap-4">
          <Text className="w-1/4 text-gray-500">Description :</Text>
          <InputField
            type="text"
            placeholder="Product Description"
            register={register}
            name="description"
            validation={{
              required: "Description is required",
            }}
            errors={errors}
            className="w-full"
          />
        </Div>

        {/* Product Images */}
        <Div className="flex gap-3">
          <Text className="w-1/4 text-gray-500">Product Images :</Text>
          {imageInputs.map((input, index) => (
            <Div key={input} className="flex w-fit items-center gap-4">
              <Div className="w-full flex gap-4 items-center">
                {imagePreviews[index] ? (
                  <label
                    htmlFor={`image-${index}`}
                    className="border-gray-300 w-24 h-20 flex items-center justify-center text-gray-200 rounded-md cursor-pointer bg-transparent hover:bg-gray-100 transition-all"
                  >
                    <img
                      src={imagePreviews[index]}
                      alt={`Preview ${index + 1}`}
                      className="mt-2 w-24 h-20 object-cover rounded-md"
                    />
                  </label>
                ) : (
                  <label
                    htmlFor={`image-${index}`}
                    className="border border-dashed border-gray-300 w-24 h-20 flex items-center justify-center text-gray-200 rounded-md cursor-pointer bg-transparent hover:bg-gray-100 transition-all"
                  >
                    <LuImagePlus size={40} />
                  </label>
                )}

                <input
                  id={`image-${index}`}
                  type="file"
                  onChange={(e) => handleImageUpload(e, index)}
                  className="hidden"
                />
              </Div>
            </Div>
          ))}
        </Div>

        {/* Submit Button */}
        <Div className="flex justify-center gap-3 mt-4">
          <button className="bg-secondary rounded-xl p-2 px-5" type="submit">
            Add Product
          </button>
          <button
            className="bg-btn rounded-xl p-2 px-5"
            type="button"
            onClick={() => console.log("Form discarded")}
          >
            Discard
          </button>
        </Div>
      </form>
    </Div>
  );
};