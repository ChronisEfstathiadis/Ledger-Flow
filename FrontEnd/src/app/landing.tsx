import { useAuth0 } from "@auth0/auth0-react";

export const Landing = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <h2>Welcome to the Landing Page</h2>
      <p>This is the landing page of the application.</p>
      <button onClick={() => loginWithRedirect()}>Login</button>
    </div>
  );
};
