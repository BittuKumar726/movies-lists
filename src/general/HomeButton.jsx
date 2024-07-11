import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <>
      <div className="lg:mt-6 lg:ml-10 mt-10 ml-8 dark:text-black">
        <span className="relative flex">
          <Link to="/" className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
            <span className="w-20 absolute inset-x-0 bottom-0 h-1 bg-gradient-to-l from-red-200 to-red-500 ml-1 mt-1"></span>
          </Link>
        </span>
      </div>
    </>
  );
};

export default HomeButton;
