import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-gray-200 border-t-gray-500 rounded-full animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    </div>
  );
}

export default Loading;
