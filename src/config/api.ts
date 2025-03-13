import axios from "axios";

export const fetchData = async (endpoint: string): Promise<any> => {
  const response = await axios.get(endpoint);
  return response.data;
};

export const postData = async (endpoint: string, data: any): Promise<any> => {
  console.log(`Making API request to: ${endpoint} with data:`, data); // Log request
  try {
    const response = await axios.post(endpoint, data);
    console.log("API Response Data:", response.data); // Log API response
    return response.data;
  } catch (error) {
    console.error("Error in postData:", error);
    throw error;
  }
};


export const updateData = async (endpoint: string, data: any): Promise<any> => {
  const response = await axios.put(endpoint, data);
  return response.data;
};

export const patchData = async (endpoint: string, data: any): Promise<any> => {
  const response = await axios.patch(endpoint, data);
  return response.data;
};

export const deleteData = async (endpoint: string): Promise<any> => {
  const { data } = await axios.delete(endpoint);
  return data;
};
