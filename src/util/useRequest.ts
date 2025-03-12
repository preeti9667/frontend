'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { GET_MEETING_API } from "@/constant";
import { toast } from "react-toastify";

interface FetchOptions {
  url: string;
  params?: Record<string, unknown>;
}

const useRequest = ({ url, params }: FetchOptions) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState< any | null>([]);

  // Prevent infinite loops by stringifying `params`
  useEffect(() => {
    fetchData();
  },[url,  JSON.stringify(params)]); 

 
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
      console.log(response.data); // Log the response data for debugging
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
 
  

  return { isLoading, data,  };
};

export default useRequest;
