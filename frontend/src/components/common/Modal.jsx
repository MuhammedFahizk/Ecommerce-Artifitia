import React from "react";
import { Div } from "./Div";

export const Modal = ({ isOpen,width, onClose, children, className = "" , productData }) => {
  if (!isOpen) return null;

  return (
    <Div
      id="default-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed top-0 left-0 text-gray-600 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 ${className}`}
    >
      <Div className=   {`bg-white rounded-lg shadow-lg  ${width ? width : 'max-w-lg'}  px-6   py-2 overflow-y-scroll h-fit relative`}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        <Div className="modal-body">{children}</Div>
      </Div>
    </Div>
  );
};
