import React from "react";

const BallSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-16 h-16 animate-spin">
        {/* Ball 1*/}
        <div
          className="absolute w-4 h-4 bg-blue-500 rounded-full"
          style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
        ></div>

        {/* Ball 2*/}
        <div
          className="absolute w-4 h-4 bg-indigo-500 rounded-full"
          style={{ top: '50%', left: '100%', transform: 'translate(-50%, -50%)' }}
        ></div>

        {/* Ball 3*/}
        <div
          className="absolute w-4 h-4 bg-blue-900 rounded-full"
          style={{ top: '100%', left: '50%', transform: 'translate(-50%, -50%)' }}
        ></div>

        {/* Ball 4*/}
        <div
          className="absolute w-4 h-4 bg-indigo-900 rounded-full"
          style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}
        ></div>
      </div>
    </div>
  );
};

export default BallSpinner;