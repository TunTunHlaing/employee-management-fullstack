import React from 'react';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button onClick={closeModal} className="absolute top-2 right-2 text-xl text-gray-600">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
