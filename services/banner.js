import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const BannerAPI = Object.freeze({
  getBanners: createAsyncThunk("get/get-banners", async (params) => {
    return await axiosGet.get(`/regular-banner`, { params });
  }),
  getOneBanner: createAsyncThunk("get/one-banner", async (pageName) => {
    return await axiosGet.get(`/regular-banner-filter/${pageName}`);
  }),
  postBanner: createAsyncThunk("post/post-banner", async (data) => {
    return await axiosPost.post("/regular-banner", data);
  }),
  deleteBanner: createAsyncThunk("delete/delete-banner", async (id) => {
    return await axiosDelete.delete(`/regular-banner/${id}`);
  }),
  putUpdateBanner: createAsyncThunk("put/put-banner", async (data) => {
    return await axiosPut.put(`/regular-banner/${data.id}`, data);
  }),
});
