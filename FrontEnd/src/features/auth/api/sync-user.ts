import type { MutationConfig, QueryConfig } from "@/lib/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const syncUser = async (token: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/users/me`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
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

export const useUser = (token: string | null, config?: QueryConfig<any>) => {
  return useQuery({
    queryKey: ["currentUser", token],
    queryFn: () => syncUser(token!),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    ...config,
  });
};
