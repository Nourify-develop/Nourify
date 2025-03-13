import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchData, postData, updateData } from "@/config/api";
import { handleGenericError } from "@/lib/errorHandler";

export const usePostMutation = <T>(
  endpoint: string,
  queryKey: string | readonly unknown[]
) => {
  const queryClient = useQueryClient(); // Ensure useQueryClient is correctly imported

  const mutation = useMutation({
    mutationFn: async (newData: T) => {
      console.log("API Call initiated: ", newData);
      try {
        const response = await postData(endpoint, newData);
        console.log('API response')
        return response;
      } catch (error) {
        console.log('API error')
        throw error || new Error("An unexpected error occurred");
      }
    },
    onSuccess: (data) => {
      if (queryKey) {
        const normalizedQueryKey = Array.isArray(queryKey)
          ? queryKey
          : [queryKey];
        queryClient.invalidateQueries({ queryKey: normalizedQueryKey });
        const successMessage =
          data?.response || data?.message || "Operation successful";
        toast.success(successMessage);
      }
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });

  return mutation;
};

export const useGetQuery = (url: string, key: string) => {
  return useQuery({
    queryKey: [key, url],
    queryFn: async () => {
      const response = await fetchData(url);
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
};

export const usePutMutation = <T>(
  endpoint: string,
  queryKey: string | readonly unknown[]
) => {
  const queryClient = useQueryClient(); // Ensure useQueryClient is correctly imported

  const mutation = useMutation({
    mutationFn: async (updatedData: T) => {
      try {
        const response = await updateData(endpoint, updatedData);
        return response;
      } catch (error) {
        throw error || new Error("An unexpected error occurred");
      }
    },
    onSuccess: (data) => {
      if (queryKey) {
        const normalizedQueryKey = Array.isArray(queryKey)
          ? queryKey
          : [queryKey];
        queryClient.invalidateQueries({ queryKey: normalizedQueryKey });
        const successMessage =
          data?.response || data?.message || "Update successful";
        toast.success(successMessage);
        return data;
      }
      console.log("Successful");
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error);
      toast.error(errorMessage);
      console.log("Errored");
      throw new Error(errorMessage);
    },
  });
  return mutation;
};
