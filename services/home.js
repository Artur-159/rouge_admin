import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const HomeAPI = Object.freeze({
  getHomeBanners: createAsyncThunk("get/get-home-banner", async (params) => {
    return await axiosGet.get(`/home-banner`, { params });
  }),
  getOneHomeBanner: createAsyncThunk("get/one-home-banner", async (id) => {
    return await axiosGet.get(`/home-banner/${id}`);
  }),
  postHomeBanner: createAsyncThunk("post/post-home-banner", async (data) => {
    return await axiosPost.post("/home-banner", data);
  }),
  deleteHomeBanner: createAsyncThunk(
    "delete/delete-home-banner",
    async (id) => {
      return await axiosDelete.delete(`/home-banner/${id}`);
    }
  ),
  putUpdateHomeBanner: createAsyncThunk("put/put-home-banner", async (data) => {
    return await axiosPut.put(`/home-banner/${data.id}`, data);
  }),
  postMedia: createAsyncThunk("post/media", async (data) => {
    return {
      data: await axiosPost.post("/upload-mixed-media", data),
      lang: data.lang,
    };
  }),
});
