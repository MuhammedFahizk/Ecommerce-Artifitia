import { useForm } from "react-hook-form";
import { Button, Div, InputField, Text } from "../common/Index";
import { CiMail, CiLock } from "react-icons/ci";
import { loginUser } from "../../services/postApi";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../Redux/feathers/auth";
import { useDispatch } from "react-redux";
export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await loginUser(data);
      const { accessToken } = response.data;
      dispatch(setAccessToken(accessToken));
      // notification.success({
      //   message: "Signup successful!",
      //   description: response.message,
      // });
      navigate("/home");
    } catch (error) {
      // notification.error({
      //   message: "Signup failed",
      //   description: error.message,
      // });
    }
  };

  return (
    <Div className="col-span-5 px-20 flex flex-col text-center justify-center items-center min-h-screen">
      <Text className="text-4xl font-semibold text-secondary mb-6">
        Sign In to <br />
        Your &nbsp; Account
      </Text>
      <Div className="w-full max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

          <InputField
            type="password"
            placeholder="Password"
            register={register}
            name="password"
            icon={CiLock}
            validation={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            }}
            errors={errors}
          />

          <Button
            type="submit"
            className="btn bg-secondary  mx-auto w-fit px-20 rounded-full text-white text-xl "
          >
            Sign In
          </Button>
        </form>
      </Div>
    </Div>
  );
};
