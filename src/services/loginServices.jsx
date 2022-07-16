import { api, handleResponse, handleError } from "./apiServices";

export const loginApi = data =>
   api()
    .post("/auth/login", data)
    .then(handleResponse)
    .catch(handleError);

export const forgotPassword = data =>
    api()
     .post("/auth/forgot-password", data)
     .then(handleResponse)
     .catch(handleError);
