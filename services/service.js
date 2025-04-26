import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const ServiceAPI = Object.freeze({
  getServices: createAsyncThunk("get/get-services", async (params) => {
    return await axiosGet.get(`/service`, { params });
  }),
  getOneService: createAsyncThunk("get/one-service", async (id) => {
    return await axiosGet.get(`/service/${id}`);
  }),
  postService: createAsyncThunk("post/post-service", async (data) => {
    return await axiosPost.post("/service", data);
  }),
  deleteService: createAsyncThunk("delete/delete-service", async (id) => {
    return await axiosDelete.delete(`/service/${id}`);
  }),
  putUpdateService: createAsyncThunk("put/put-service", async (data) => {
    return await axiosPut.put(`/service/${data.id}`, data);
  }),
});
