import { Ellipsis, Loader, LoaderCircle } from "lucide-react";
import React from "react";

const LoadingSpinner = ({ loadingText = null }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <LoaderCircle
        size={48}
        color="#fb7979"
        strokeWidth={3}
        absoluteStrokeWidth
        className="animate-spin"
      />
      {loadingText && (
        <p className="mt-4 text-gray-700 text-1xl">{loadingText}</p> // Add some margin-top for the text
      )}
    </div>
  );
};

export default LoadingSpinner;
