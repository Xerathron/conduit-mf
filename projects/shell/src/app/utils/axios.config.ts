import { AxiosRequestConfig } from "axios";

/**
 * Axios request timeout in milliseconds 
 */
const TIMEOUT = 5000; 
  

export const AXIOS_CONFIG: AxiosRequestConfig = {
    timeout: TIMEOUT
}