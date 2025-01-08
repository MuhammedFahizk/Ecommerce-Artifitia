import { addCategory } from "../../services/postApi";
import { Div, InputField, Button, Notification } from "../common/Index";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const AddCategory = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [notification, setNotification] = useState({
    isVisible: false,
    type: "",
    message: "",
  });

  const showNotification = (type, message) => {
    setNotification({ isVisible: true, type, message });
  };

  const onSubmit = async (data) => {
    console.log("Category Data:", data);
    try {
      const response = await addCategory(data);
      console.log(response);
      showNotification("success", "Category added successfully!");
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
      <h1 className="text-2xl font-semibold mb-4">Add Category</h1>

      {notification.isVisible && (
        <Notification type={notification.type} message={notification.message} />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md flex flex-col gap-4"
      >
        {/* Category Name Input Field */}
        <InputField
          type="text"
          placeholder="Enter Category Name"
          register={register}
          name="name"
          validation={{
            required: "Category name is required",
            minLength: {
              value: 3,
              message: "Category name must be at least 3 characters long",
            },
          }}
          errors={errors}
        />

        <Div className={"flex justify-center gap-3"}>
          <Button className="bg-secondary rounded-xl p-2 px-5" type="submit">
            Add Category
          </Button>
          <Button
            className="bg-btn rounded-xl p-2 px-5"
            type="button"
            onClick={() => closeModal()}
          >
            Discard
          </Button>
        </Div>
      </form>
    </Div>
  );
};
