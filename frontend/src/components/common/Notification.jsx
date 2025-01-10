import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Div } from "./Div";

export const Notification = ({
  type = "info", 
  message = "This is a notification!",
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null; 

  const typeStyles = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning", 
  };

  return (
    <Div
      className={`alert ${typeStyles[type]} flex items-center justify-between p-4 rounded-md shadow-md mb-4 max-w-md mx-auto`}
    >
      <Div>{message}</Div>
      <button
        onClick={handleClose}
        className="btn btn-sm btn-ghost text-lg font-semibold px-2 py-1 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        ✖
      </button>
    </Div>
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf(["success", "error", "info", "warning"]),
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func,
};
