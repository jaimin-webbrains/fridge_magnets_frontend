import { api, handleResponse, handleError } from "./apiServices";

export const getInquiries = token =>
  api(token)
    .get("/inquiries/list")
    .then(handleResponse)
    .catch(handleError);