import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";

export const AboutAPI = Object.freeze({
  getAbout: createAsyncThunk("get/about", async () => {
    return await axiosGet.get(`about`);
  }),
  postAbout: createAsyncThunk("post/post-about", async (data) => {
    return await axiosPost.post("/about", data);
  }),
});
