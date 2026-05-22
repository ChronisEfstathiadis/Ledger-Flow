import { paths } from "@/config/paths";
import { useUser } from "@/features/auth/api/sync-user";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isLoading,
    error,
  } = useUser({
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error || !user) {
    return <Navigate to={paths.landing.path} replace />;
  }

  return <>{children}</>;
};
