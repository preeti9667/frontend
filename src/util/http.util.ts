

import axios from "axios";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";

const post =async (
    url: string,
    data: any
) => {
    try {
        const response = await axios.post(url, data);
        const status = response.status;
        const resData = response.data;
        return {status, data: resData};
    } catch (error:any) {
        const errorResponse = error.response.data;
        toast.error(errorResponse.message, {theme: 'colored'});
        return {error: errorResponse};
    }
}


const get =async (
    url: string,
    query?: any
) => {
    try {
        const response = await axios.get(url,
             {params: query, headers: {
            Authorization: `Bearer ${getCookie("Token")}`,
          },});
        const status = response.status;
        const resData = response.data;
        // toast.error(resData.message, {theme: 'colored'});
        return {status, data: resData};
    } catch (error:any) {
        const errorResponse = error.response.data;
        toast.error(errorResponse.message, {theme: 'colored'});
        return {error: errorResponse};
    }
}






export {post, get};