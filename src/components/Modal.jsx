import React from "react";
import { RxCross2 } from "react-icons/rx";
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50  ">
      <div className=" relative bg-white p-6 rounded shadow-lg w-[600px] h-[250px] overflow-y-auto scrollbar-hide">
        <div className="flex justify-between mb-5">
          <h2 className="text-xl font-bold ">Add New Task</h2>
          <RxCross2
            className="my-auto text-black hover:text-red-900 duration-700"
            size={20}
            onClick={onClose}
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
