import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const BrandAPI = Object.freeze({
  postBrand: createAsyncThunk("post/brand", async (data) => {
    return await axiosPost.post("/brand", data);
  }),
  getBrandsList: createAsyncThunk("get/brand-list", async (params) => {
    return await axiosGet.get(`/brand`, { params });
  }),
  deleteBrand: createAsyncThunk("delete/delete-brand", async (id) => {
    return await axiosDelete.delete(`/brand/${id}`);
  }),
  getOneBrand: createAsyncThunk("get/one/brand", async (id) => {
    return await axiosGet.get(`/brand/${id}`);
  }),
  putOneBrand: createAsyncThunk("put/put-brand", async (data) => {
    return await axiosPut.put(`/brand/${data.id}`, data);
  }),
});
