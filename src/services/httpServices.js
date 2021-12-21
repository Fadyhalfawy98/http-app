//UnExpected Error Function
import Axios from "axios";

Axios.interceptors.response.use(null, error => {
    const expectedError = error.response
        && error.response.status >= 400
        && error.response.status < 500;

    if (!expectedError){
        console.log("Logging the error.. ", error);
        alert("An unexpected error occurred..");
        return Promise.reject(error);
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