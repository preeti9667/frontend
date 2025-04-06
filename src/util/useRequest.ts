'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
import { GET_USERS_API } from "@/constant";
import { ref } from "yup";

interface FetchOptions {
  url: string;
  params?: Record<string, unknown>;
}
interface userProps {
  id: string
}

const useRequest = ({ url, params }: FetchOptions) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState< any | null>([]);

  // Prevent infinite loops by stringifying `params`
  useEffect(() => {
    fetchData();
  },[url, JSON.stringify(params)]); 

 
  const fetchData = async () => {
    setIsLoading(true); // Start loading
    try {
      
      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${getCookie("Token")}`, // Include auth token in headers
        },
      });
      setData(response.data); // Store the response data
      setIsLoading(false);
      // console.log(response.data); // Log the response data for debugging
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
 
  

  return { isLoading, data, refetch: fetchData };
};

export default useRequest;



