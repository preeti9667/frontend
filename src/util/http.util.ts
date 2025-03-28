
import axios from "axios";
import { toast } from "react-toastify";
const post = async (
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

export {post};