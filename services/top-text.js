import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const TopTextAPI = Object.freeze({
  getTopTexts: createAsyncThunk("get/top-texts", async (params) => {
    return await axiosGet.get(`/top-text`, { params });
  }),
  getOneTopText: createAsyncThunk("get/one-top-text", async (id) => {
    return await axiosGet.get(`/top-text/${id}`);
  }),
  postTopText: createAsyncThunk("post/top-text", async (data) => {
    return await axiosPost.post("/top-text", data);
  }),
  deleteTopText: createAsyncThunk("delete/top-text", async (id) => {
    return await axiosDelete.delete(`/top-text/${id}`);
  }),
  putUpdateTopText: createAsyncThunk("put/top-text", async (data) => {
    return await axiosPut.put(`/top-text/${data.id}`, data);
  }),
});
