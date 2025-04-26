import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const FaqAPI = Object.freeze({
  getFAQ: createAsyncThunk("get/faq-list", async (params) => {
    return await axiosGet.get(`/faq`, { params });
  }),
  getOneFAQ: createAsyncThunk("get/one-list", async (id) => {
    return await axiosGet.get(`/faq/${id}`);
  }),
  deleteFAQ: createAsyncThunk("delete/faq-delete", async (id) => {
    return await axiosDelete.delete(`/faq/${id}`);
  }),
  postFAQ: createAsyncThunk("post/post-faq", async (data) => {
    return await axiosPost.post("/faq", data);
  }),
  putUpdateFAQ: createAsyncThunk("put/put-change-role", async (data) => {
    return await axiosPut.put(`/faq/${data.id}`, data);
  }),
});
