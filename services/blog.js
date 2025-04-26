import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const BlogAPI = Object.freeze({
  getBlogs: createAsyncThunk("get/get-blog", async (params) => {
    return await axiosGet.get(`/blog`, { params });
  }),
  getOneBlog: createAsyncThunk("get/one-blog", async (id) => {
    return await axiosGet.get(`/blog/${id}`);
  }),
  postBlog: createAsyncThunk("post/post-blog", async (data) => {
    return await axiosPost.post("/blog", data);
  }),
  deleteBlog: createAsyncThunk("delete/delete-blog", async (id) => {
    return await axiosDelete.delete(`/blog/${id}`);
  }),
  putUpdateBlog: createAsyncThunk("put/put-blog", async (data) => {
    return await axiosPut.put(`/blog/${data.id}`, data);
  }),
});
