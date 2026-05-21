import { paths } from "@/config/paths";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to={paths.landing.path} replace />;

  return <>{children}</>;
};
