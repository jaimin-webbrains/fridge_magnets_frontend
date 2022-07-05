import { api, handleResponse, handleError } from "./apiServices";

export const getPapers = token =>
  api(token)
    .get("/papers/list")
    .then(handleResponse)
    .catch(handleError);

export const addPaper = (token, data) =>
  api(token)
    .post("/papers/add", data)
    .then(handleResponse)
    .catch(handleError);

export const updatePaper = (token, data) =>
  api(token)
    .put("/papers/update", data)
    .then(handleResponse)
    .catch(handleError);

export const deletePaper = (token, data) =>
  api(token)
    .delete("/papers/delete", { data: data })
    .then(handleResponse)
    .catch(handleError);