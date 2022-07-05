import { api, handleResponse, handleError } from "./apiServices";

export const getSizes = token =>
  api(token)
    .get("/sizes/list")
    .then(handleResponse)
    .catch(handleError);

export const addSize = (token, data) =>
  api(token)
    .post("/sizes/add", data)
    .then(handleResponse)
    .catch(handleError);

export const updateSize = (token, data) =>
  api(token)
    .put("/sizes/update", data)
    .then(handleResponse)
    .catch(handleError);

export const deleteSize = (token, data) =>
  api(token)
    .delete("/sizes/delete", { data: data })
    .then(handleResponse)
    .catch(handleError);