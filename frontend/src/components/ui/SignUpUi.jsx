import { useForm } from "react-hook-form";
import { Button, Div, InputField, Text } from "../common/Index";
import { CiMail, CiLock } from "react-icons/ci";
import { FiUser } from "react-icons/fi";

export const SignUpUi = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <Div className="col-span-5 px-20 flex flex-col text-center justify-center items-center min-h-screen">
    <Text className="text-4xl font-semibold text-secondary mb-6">
    Create Account
    </Text>
    <Div className="w-full max-w-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* Name  Input */}

      <InputField 
          type="text"
          placeholder="Name"
            icon={FiUser }
          register={register}
          name="name"
          validation={{
            required: "Name is required",
          
          }}
          errors={errors}
        />



        {/* Email Input */}
        <InputField 

          type="email"
          placeholder="Email"
          icon={CiMail}
          register={register}
          name="email"
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
          errors={errors}
        />

        {/* Password Input */}
        <InputField
          type="password"
          placeholder="Password"
          icon={CiLock}
          register={register}
          name="password"
          validation={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          }}
          errors={errors}
        />

        {/* Submit Button */}
        <Button type="submit" className="btn bg-secondary  mx-auto w-fit px-20 rounded-full text-white text-xl ">
          Sign Up
        </Button>
      </form>
    </Div>
  </Div>
  )
}
