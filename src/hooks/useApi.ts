import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { handleGenericError } from "@/lib/errorHandler";
import {
  deleteData,
  fetchData,
  patchData,
  postData,
  updateData,
} from "@/config/api";
import { toast } from "sonner";

export const useFetchData = (endpoint: string, queryKey: any) => {
  return useQuery({
    queryKey: [queryKey, endpoint], // Combined key for caching
    queryFn: () => fetchData(endpoint), // Fetch function that returns a promise
    refetchOnWindowFocus: false,
  });
};

export const useCreateData = (endpoint: string, queryKey: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await postData(endpoint, data);
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(queryKey);
      return response;
    },
    onError: (error: any) => {
      const errorMessage = handleGenericError(error);
      toast.error(errorMessage);
      console.log(errorMessage);
      throw new Error(errorMessage);
    },
  });
};

export const useUpdateData = (endpoint: string, queryKey: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newData: any) => {
      const response = await updateData(endpoint, newData);
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(queryKey);
      return response;
    },
    onError: (error: any) => {
      const errorMessage = handleGenericError(error);
      console.log(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
};

export const usePatchData = (endpoint: string, queryKey: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await patchData(endpoint, data);
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(queryKey);
      return response;
    },
    onError: (error: any) => {
      const errorMessage = handleGenericError(error);
      console.log(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
};

export const useDeleteData = (endpoint: string, queryKey: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await deleteData(endpoint);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error: any) => {
      const errorMessage = handleGenericError(error);
      console.log(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
};
