import { api, handleResponse, handleError } from "./apiServices";

export const getBrands = token =>
  api(token)
    .get("/brands/list")
    .then(handleResponse)
    .catch(handleError);

export const addBrand = (token, data) =>
  api(token)
    .post("/brands/add", data)
    .then(handleResponse)
    .catch(handleError);

export const updateBrand = (token, data) =>
  api(token)
    .put("/brands/update", data)
    .then(handleResponse)
    .catch(handleError);

export const deleteBrand = (token, data) =>
  api(token)
    .delete("/brands/delete", { data: data })
    .then(handleResponse)
    .catch(handleError);