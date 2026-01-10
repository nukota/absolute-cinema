import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../services/authService";
import { UserRole } from "../utils/enum";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const { data: user, isLoading, isError } = useCurrentUser();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Redirect to signin if not authenticated
  if (isError || !user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect customers trying to access admin pages back to home
    if (user.role === UserRole.Customer) {
      return <Navigate to="/" replace />;
    }
    // Redirect other unauthorized access to signin
    return <Navigate to="/signin" replace />;
  }

  // User is authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;
