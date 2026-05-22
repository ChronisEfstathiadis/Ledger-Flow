import { useUser } from "@/features/auth/api/sync-user";

export const Home = () => {
  const { data: user, isLoading, error } = useUser();

  const handleLogout = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/logout`;
  };

  if (isLoading) return <div>Loading user session...</div>;
  if (error) return <div>Error loading session</div>;

  return (
    <div>
      <h2>Welcome {user?.name || "Guest"}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
