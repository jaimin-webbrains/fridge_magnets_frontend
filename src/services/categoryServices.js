import { api, handleResponse, handleError } from "./apiServices";

export const getCategories = token =>
  api(token)
    .get("/categories/list")
    .then(handleResponse)
    .catch(handleError);

export const getParentCategories = token =>
  api(token)
    .get("/categories/parent-list")
    .then(handleResponse)
    .catch(handleError);

export const addCategory = (token, data) =>
  api(token)
    .post("/categories/add", data)
    .then(handleResponse)
    .catch(handleError);

export const updateCategory = (token, data) =>
  api(token)
    .put("/categories/update", data)
    .then(handleResponse)
    .catch(handleError);

export const deleteCategory = (token, data) =>
  api(token)
    .delete("/categories/delete", { data: data })
    .then(handleResponse)
    .catch(handleError);