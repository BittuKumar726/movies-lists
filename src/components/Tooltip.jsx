import React from "react";

export const Tooltip = ({ text, position }) => {
  return (
    <div
      className={`absolute z-50 p-2 text-sm text-gray-900 bg-slate-400 rounded-md shadow-lg ${position}`}
    >
      {text}
    </div>
  );
};
