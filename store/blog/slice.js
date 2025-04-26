import { createSlice } from "@reduxjs/toolkit";
import { BlogAPI } from "../../services/blog";

const Blog = createSlice({
  name: "Blog slice",
  initialState: {
    list: [],
    oneBlog: [],
    deleteBlog: null,
    status: null,
  },
  reducers: {
    isStatusText: (state, action) => {
      state.status = action.payload;
    },
    isDeleteBlog: (state, action) => {
      state.deleteBlog = action.payload;
    },
    isOneBlog: (state, action) => {
      state.oneBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BlogAPI.getBlogs.fulfilled, (state, action) => {
        state.list = action.payload.data.data.blogs;
      })
      .addCase(BlogAPI.postBlog.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })
      .addCase(BlogAPI.deleteBlog.fulfilled, (state) => {
        state.list = state.list.filter((item) => item.id !== state.deleteBlog);
      })
      .addCase(BlogAPI.getOneBlog.fulfilled, (state, action) => {
        state.oneBlog = action.payload.data.data;
      })
      .addCase(BlogAPI.putUpdateBlog.fulfilled, (state, action) => {
        state.status = action.payload.status;
      });
  },
});

export const { isStatusText, isDeleteBlog, isOneBlog } = Blog.actions;
export default Blog;
