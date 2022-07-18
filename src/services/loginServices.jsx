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

export const user_logout = token =>
     api(token)
     .get("/auth/logout")
     .then(handleResponse)
     .catch(handleError);

// router.get ("", auth , AuthController.logout);
