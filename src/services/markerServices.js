import { api, handleResponse, handleError } from "./apiServices";

export const getMarkers = token =>
  api(token)
    .get("/markers/list")
    .then(handleResponse)
    .catch(handleError);

export const addMarker = (token, data) =>
  api(token)
    .post("/markers/add", data)
    .then(handleResponse)
    .catch(handleError);

export const updateMarker = (token, data) =>
  api(token)
    .put("/markers/update", data)
    .then(handleResponse)
    .catch(handleError);

export const deleteMarker = (token, data) =>
  api(token)
    .delete("/markers/delete", { data: data })
    .then(handleResponse)
    .catch(handleError);