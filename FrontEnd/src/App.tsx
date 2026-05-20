import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function App() {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    const syncUser = async () => {
      if (!isAuthenticated) return;
      const token = await getAccessTokenSilently();
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    };
    syncUser();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (!isAuthenticated) {
    return <button onClick={() => loginWithRedirect()}>Log in</button>;
  }

  return (
    <div>
      <p>Hello {user?.name}</p>
      <button onClick={() => logout()}>Log out</button>
    </div>
  );
}
