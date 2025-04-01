import axios from 'axios';
import { toast } from 'react-toastify';

interface FetchOptions {
    url: string;
    data: any;
  }

const  useRequestPost = async ( { url, data }: FetchOptions) => {
    
//   const toastId =  toast.loading('Please wait', {theme: 'colored'})

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




export default useRequestPost