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

export const logoutApi = (token, data) =>
     api(token)
     .post("/auth/logout",data)
     .then(handleResponse)
     .catch(handleError);

export const checkApi = (token,data) =>
     api(token)
       .post("/auth/check",data)
       .then(handleResponse)
       .catch(handleError);

// router.get ("", auth , AuthController.logout);
