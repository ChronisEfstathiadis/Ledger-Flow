import type { MutationConfig, QueryConfig } from "@/lib/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const syncUser = async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/users/me`,
    {},
    {
      withCredentials: true, // Crucial: Automatically attaches httpOnly cookies with requests
    }
  );
  return response.data;
};

export const useSyncUser = (config: MutationConfig<typeof syncUser>) => {
  return useMutation({
    mutationFn: syncUser,
    ...config,
  });
};

export const useUser = (config?: QueryConfig<any>) => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => syncUser(),
    staleTime: 1000 * 60 * 5,
    ...config,
  });
};
