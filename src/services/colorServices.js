import { api, handleResponse, handleError } from "./apiServices";

export const getColors = token =>
  api(token)
    .get("/colors/list")
    .then(handleResponse)
    .catch(handleError);

export const addColor = (token, data) =>
  api(token)
    .post("/colors/add", data)
    .then(handleResponse)
    .catch(handleError);

export const updateColor = (token, data) =>
  api(token)
    .put("/colors/update", data)
    .then(handleResponse)
    .catch(handleError);

export const deleteColor = (token, data) =>
  api(token)
    .delete("/colors/delete", { data: data })
    .then(handleResponse)
    .catch(handleError);