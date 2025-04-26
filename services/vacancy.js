import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const VacancyAPI = Object.freeze({
  getVacancies: createAsyncThunk("get/get-vacancies", async (params) => {
    return await axiosGet.get(`/vacancy`, { params });
  }),
  getOneVacancy: createAsyncThunk("get/one-vacancy", async (id) => {
    return await axiosGet.get(`/vacancy/${id}`);
  }),
  postVacancy: createAsyncThunk("post/post-vacancy", async (data) => {
    return await axiosPost.post("//vacancy", data);
  }),
  deleteVacancy: createAsyncThunk("delete/delete-vacancy", async (id) => {
    return await axiosDelete.delete(`/vacancy/${id}`);
  }),
  putUpdateVacancy: createAsyncThunk("put/put-vacancy", async (data) => {
    return await axiosPut.put(`/vacancy/${data.id}`, data);
  }),
});
