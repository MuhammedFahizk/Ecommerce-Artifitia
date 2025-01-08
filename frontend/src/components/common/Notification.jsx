import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Div } from "./Div";

export const Notification = ({
  type = "info", // Type: success | error | info | warning
  message = "This is a notification!",
  duration = 3000, // Duration in milliseconds (0 for no auto-dismiss)
  onClose, // Callback for when the notification is closed
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss logic
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [duration]);

  // Handle manual close
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose(); // Trigger callback
  };

  if (!isVisible) return null; // Hide component if not visible

  // Dynamic styles based on type using DaisyUI
  const typeStyles = {
    success: "alert-success", // DaisyUI success alert class
    error: "alert-error", // DaisyUI error alert class
    info: "alert-info", // DaisyUI info alert class
    warning: "alert-warning", // DaisyUI warning alert class
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
