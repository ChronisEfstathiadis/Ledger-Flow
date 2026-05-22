import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    window.location.href = `${import.meta.env.VITE_API_URL}/login`;
  }, []);

  return <div>Redirecting to login...</div>;
}
