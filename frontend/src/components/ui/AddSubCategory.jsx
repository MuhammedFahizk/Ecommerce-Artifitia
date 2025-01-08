import { Div, InputField, Button, Notification } from "../common/Index";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { getCategory } from "../../services/getApi";
import { addSubCategory } from "../../services/postApi";

export const AddSubCategory = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState({
    isVisible: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
        showNotification("error", "Failed to fetch categories.");
      }
    };
    fetchCategories();
  }, []);

  const showNotification = (type, message) => {
    setNotification({ isVisible: true, type, message });
  };

  const onSubmit = async (data) => {
    console.log("Sub Category Data:", data);
    try {
      const response = await addSubCategory(data);
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

  return (
    <Div className="flex flex-col items-center w-full">
      <h1 className="text-2xl font-semibold mb-4">Add Sub Category</h1>

      {/* Notification */}
      {notification.isVisible && (
        <Notification type={notification.type} message={notification.message} />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md flex flex-col gap-4"
      >
        {/* Dropdown for Category Selection */}
        <Div className="relative">
          <select
            className={`input bg-info w-full ${
              errors.category ? "input-error" : ""
            } appearance-none pr-10`} // Add padding-right for the icon
            {...register("parent", {
              required: "Please select a category",
            })}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {/* Icon positioned to the right */}
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
            <IoIosArrowDown />
          </span>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </Div>

        {/* Sub Category Name Input Field */}
        <InputField
          type="text"
          placeholder="Enter Sub Category Name"
          register={register}
          name="name"
          validation={{
            required: "Sub Category name is required",
            minLength: {
              value: 2,
              message: "Sub Category name must be at least 2 characters long",
            },
          }}
          errors={errors}
        />

        {/* Buttons */}
        <Div className="flex justify-center gap-3">
          <Button className="bg-secondary rounded-xl p-2 px-5" type="submit">
            Add Sub Category
          </Button>
          <Button
            onClick={() => closeModal()}
            className="bg-btn rounded-xl p-2 px-5"
            type="button"
          >
            Discard
          </Button>
        </Div>
      </form>
    </Div>
  );
};
