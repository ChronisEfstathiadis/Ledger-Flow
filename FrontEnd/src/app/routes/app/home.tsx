import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useUser } from "@/features/auth/api/sync-user";

export const Home = () => {
  const { getAccessTokenSilently, logout, isAuthenticated } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (err) {
        console.error("Failed to get token:", err);
      }
    };
    if (isAuthenticated) {
      fetchToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const { data: user, isLoading, error } = useUser(token);

  if (isLoading) return <div>Loading user session...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      Welcome {user?.name || "Guest"}
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};
