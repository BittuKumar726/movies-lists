import React, { Suspense } from "react";
import LoadingSpinner from "../components/loader";

const SuspensionWrapper = ({ children }) => {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col lg:flex-row dark:text-black">
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </div>
  );
};

export default SuspensionWrapper;
