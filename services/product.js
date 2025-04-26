import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosGet from "../axios/axios-get";

export const ProductAPI = Object.freeze({
  getProducts: createAsyncThunk("get/get-products", async (params) => {
    return await axiosGet.get(`/product-admin`, { params });
  }),
  getOneProduct: createAsyncThunk("get/one-product", async (id) => {
    return await axiosGet.get(`/product-admin/${id}`);
  }),
  putUpdateProduct: createAsyncThunk("put/put-product", async (data) => {
    return await axiosPut.put(`/product-admin/${data.barcode}`, data);
  }),
});
