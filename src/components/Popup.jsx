import React from "react";

const Popup = ({ show, isSuccess, message }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-50">
      <div
        className={`p-4 ${
          isSuccess ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"
        } border rounded-lg shadow-lg mt-4`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;