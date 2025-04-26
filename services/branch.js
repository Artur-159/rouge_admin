import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const BranchAPI = Object.freeze({
  getBranch: createAsyncThunk("get/get-branch", async (params) => {
    return await axiosGet.get(`/branch`, { params });
  }),
  getOneBranch: createAsyncThunk("get/one-branch", async (id) => {
    return await axiosGet.get(`/branch/${id}`);
  }),
  postBranch: createAsyncThunk("post/post-branch", async (data) => {
    return await axiosPost.post("/branch", data);
  }),
  deleteBranch: createAsyncThunk("delete/delete-branch", async (id) => {
    return await axiosDelete.delete(`/branch/${id}`);
  }),
  putUpdateBranch: createAsyncThunk("put/put-branch", async (data) => {
    return await axiosPut.put(`/branch/${data.id}`, data);
  }),
});
