import { createSlice } from "@reduxjs/toolkit";
import { BannerAPI } from "../../services/banner";

const Banner = createSlice({
  name: "Banner slice",
  initialState: {
    list: [],
    oneBanner: [],
    deleteBanner: null,
    status: null,
  },
  reducers: {
    isStatusText: (state, action) => {
      state.status = action.payload;
    },
    isOneBanner: (state, action) => {
      state.oneBanner = action.payload;
    },
    isDeleteBanner: (state, action) => {
      state.deleteBanner = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BannerAPI.getBanners.fulfilled, (state, action) => {
        state.list = action.payload.data.data;
      })
      .addCase(BannerAPI.postBanner.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })
      .addCase(BannerAPI.deleteBanner.fulfilled, (state) => {
        state.list = state.list.filter(
          (item) => item.id !== state.deleteBanner
        );
      })
      .addCase(BannerAPI.getOneBanner.fulfilled, (state, action) => {
        state.oneBanner = action.payload.data.data;
      })
      .addCase(BannerAPI.putUpdateBanner.fulfilled, (state, action) => {
        state.status = action.payload.status;
      });
  },
});

export const { isStatusText, isDeleteBanner, isOneBanner } = Banner.actions;
export default Banner;
