import { api, handleResponse, handleError } from "./apiServices";

export const getProducts = token =>
  api(token)
    .get("/products/list")
    .then(handleResponse)
    .catch(handleError);
    

export const getProductsTable = token =>
  api(token)
    .get("/productsTable/list")
    .then(handleResponse)
    .catch(handleError);

export const getProductById = (token, data) =>
  api(token)
    .post("/product/getById",data)
    .then(handleResponse)
    .catch(handleError);

export const addProduct = (token, data) =>
  api(token)
    .post("/products/add", data)
    .then(handleResponse)
    .catch(handleError);

export const updateProduct = (token, id,data) =>
  api(token)
    .put(`/products/update/${id}`, data)
    .then(handleResponse)
    .catch(handleError);

export const deleteProduct = (token, data) =>
  api(token)
    .delete("/products/delete", { data: data })
    .then(handleResponse)
    .catch(handleError);

export const importFiles = (token, data) =>
    api(token)
      .post("/products/importfile", data)
      .then(handleResponse)
      .catch(handleError);