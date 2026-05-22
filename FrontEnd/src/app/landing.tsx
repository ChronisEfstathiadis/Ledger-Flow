export const Landing = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/login`;
  };

  return (
    <div>
      <h2>Welcome to the Landing Page</h2>
      <p>This is the landing page of the application.</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
