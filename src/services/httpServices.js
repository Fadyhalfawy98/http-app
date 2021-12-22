//UnExpected Error Function
import Axios from "axios";
import { toast } from "react-toastify";
import logger from "./loggerServices";

Axios.interceptors.response.use(null, error => {
    const expectedError = error.response
        && error.response.status >= 400
        && error.response.status < 500;

    if (!expectedError){
        logger.log(error);
        toast.error("An unexpected error occurred..");
        // toast("An unexpected error occurred.."); as an object
    }

    return Promise.reject(error);
});
//------------------------------------------------------------------------------------
export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  patch: Axios.patch,
  delete: Axios.delete
};