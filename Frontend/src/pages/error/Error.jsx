import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <div className="w-[80vw] h-screen mx-auto flex flex-col justify-center items-center font-[Poppins]">
        <h1 className="text-4xl">404 - Page Not Found</h1>
        <p className="text-lg mt-4">Sorry, there is nothing to see here</p>
        <div className="mt-8 space-y-4">
          <Link to="/" className="text-blue-500 underline">
            Homepage
          </Link>
          <Link to="/" className="text-blue-500 underline">
            Back
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
