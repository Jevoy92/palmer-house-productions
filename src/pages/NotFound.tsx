import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Track 404 errors for analytics (remove console in production)
    if (import.meta.env.DEV) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-corporate-light">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-corporate-dark">404</h1>
        <p className="text-xl text-corporate-gray mb-4">Oops! Page not found</p>
        <Link to="/" className="text-primary hover:text-primary/80 underline font-semibold">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
