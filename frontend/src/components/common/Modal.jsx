import React from "react";
import { Div } from "./Div";

export const Modal = ({ isOpen,width, onClose, children, className = "" }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <Div
      id="default-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 ${className}`}
    >
      {/* Modal Content */}
      <Div className=   {`bg-white rounded-lg shadow-lg w-full ${width ? width : 'max-w-md'} max-w-md px-6  py-2 overflow-scroll h-fit relative`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        {/* Dynamic Children */}
        <Div className="modal-body">{children}</Div>
      </Div>
    </Div>
  );
};
