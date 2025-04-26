import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const ContactUsAPI = Object.freeze({
  getContactUs: createAsyncThunk("get/contact-us", async (params) => {
    return await axiosGet.get(`contact`, { params });
  }),
  deleteContact: createAsyncThunk("delete/contact-us", async (id) => {
    return await axiosDelete.delete(`contact/${id}`);
  }),
});
