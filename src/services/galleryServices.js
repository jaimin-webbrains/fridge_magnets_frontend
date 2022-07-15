import { api, handleResponse, handleError } from "./apiServices";

export const getGallerys = token =>
  api(token)
    .get("/gallerys/list")
    .then(handleResponse)
    .catch(handleError);

export const addGallery = (token, data) =>
  api(token)
    .post("/gallerys/add", data)
    .then(handleResponse)
    .catch(handleError);

export const updateGallery = (token, data) =>
  api(token)
    .put("/gallerys/update", data)
    .then(handleResponse)
    .catch(handleError);

export const deleteGallery = (token, data) =>
  api(token)
    .delete("/gallerys/delete", { data: data })
    .then(handleResponse)
    .catch(handleError);