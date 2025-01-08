import React from "react";
import { Div } from "./Div";

export const InputField = ({
  type = "text",
  placeholder,
  register,
  name,
  validation,
  errors,
  className = "",
  icon: Icon = null, // Optional icon prop
}) => {
  return (
    <Div className="mb-4 w-full">
      <Div className="relative flex items-center">
        {Icon && (
          <span className="absolute text-xl left-3 text-gray-500">
            <Icon />
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`input bg-info w-full ${
            errors[name] ? "input-error" : ""
          } ${Icon ? "pl-10" : ""} ${className}`} // Add padding if icon is present
          {...register(name, validation)}
        />
      </Div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </Div>
  );
};
