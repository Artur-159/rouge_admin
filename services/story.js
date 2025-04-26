import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const StoryAPI = Object.freeze({
  getStories: createAsyncThunk("get/get-story", async (params) => {
    return await axiosGet.get(`/story`, { params });
  }),
  getOneStory: createAsyncThunk("get/one-story", async (id) => {
    return await axiosGet.get(`/story/${id}`);
  }),
  postStory: createAsyncThunk("post/post-story", async (data) => {
    return await axiosPost.post("/story", data);
  }),
  deleteStory: createAsyncThunk("delete/delete-story", async (id) => {
    return await axiosDelete.delete(`/story/${id}`);
  }),
  putUpdateStory: createAsyncThunk("put/put-story", async (data) => {
    return await axiosPut.put(`/story/${data.id}`, data);
  }),
});
