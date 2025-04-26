import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const AuthorizationAPI = Object.freeze({
  postAuthorization: createAsyncThunk("post/Authorization", async (data) => {
    return await axiosPost.post("/login", data);
  }),
  postLogout: createAsyncThunk("post/logout", async () => {
    return await axiosPost.post("/logout");
  }),
  postRegSubAdmin: createAsyncThunk("post/registerAdmin", async (data) => {
    return await axiosPost.post("/register", data);
  }),
  deleteAdmin: createAsyncThunk("delete/delete-admin", async (id) => {
    return await axiosDelete.delete(`/users/${id}`);
  }),
  putBlocked: createAsyncThunk("put/put-blocked", async (data) => {
    return await axiosPut.put(`/block-user`, data);
  }),
  putChangeRole: createAsyncThunk("put/put-change-role", async (data) => {
    return await axiosPut.put(`/change-role`, data);
  }),
  getUsersList: createAsyncThunk("get/admin-list", async (params) => {
    return await axiosGet.get(`/users`, { params });
  }),
});
