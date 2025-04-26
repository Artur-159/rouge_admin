import { createSlice } from "@reduxjs/toolkit";
import { ServiceAPI } from "../../services/service";

const Service = createSlice({
  name: "Service slice",
  initialState: {
    list: [],
    oneService: [],
    deleteService: null,
    status: null,
  },
  reducers: {
    isStatusText: (state, action) => {
      state.status = action.payload;
    },
    isDeleteService: (state, action) => {
      state.deleteService = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ServiceAPI.getServices.fulfilled, (state, action) => {
        state.list = action.payload.data.data;
      })
      .addCase(ServiceAPI.postService.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })
      .addCase(ServiceAPI.deleteService.fulfilled, (state) => {
        state.list = state.list.filter(
          (item) => item.id !== state.deleteService
        );
      })
      .addCase(ServiceAPI.getOneService.fulfilled, (state, action) => {
        state.oneService = action.payload.data.data;
      })
      .addCase(ServiceAPI.putUpdateService.fulfilled, (state, action) => {
        state.status = action.payload.status;
      });
  },
});

export const { isStatusText, isDeleteService } = Service.actions;
export default Service;
