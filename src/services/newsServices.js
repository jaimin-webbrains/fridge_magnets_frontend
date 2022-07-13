import { api, handleResponse, handleError } from "./apiServices";

export const getNews = token =>
  api(token)
    .get("/news/list")
    .then(handleResponse)
    .catch(handleError);

export const addNews = (token, data) =>
  api(token)
    .post("/news/add", data)
    .then(handleResponse)
    .catch(handleError);

export const updateNews = (token, data,id) =>
  api(token)
    .put("/news/update", data)
    .then(handleResponse)
    .catch(handleError);

export const deleteNews = (token, data) =>
  api(token)
    .delete("/news/delete", { data: data })
    .then(handleResponse)
    .catch(handleError);