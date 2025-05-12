import React from "react";
import { FrownIcon } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="text-center p-8  rounded-lg  max-w-md w-full">
        <FrownIcon className="w-16 h-16 text-amber-700 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-amber-900 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg text-amber-700 mb-6">
          We couldn't find the page you're looking for. It might have been moved
          or deleted.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-amber-700 hover:bg-amber-800 text-amber-50 rounded-full transition-colors duration-300"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
