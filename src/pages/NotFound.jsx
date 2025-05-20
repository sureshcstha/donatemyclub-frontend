import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10">
    <h1 className="text-4xl font-bold text-blue-600 mb-2">404 - Page Not Found</h1>
    <p className="text-gray-700 mb-4">
        Sorry, the page you're looking for doesn't exist or has been moved.
    </p>
    <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
        Go Home
    </Link>
    </div>
  );
};

export default NotFound;
