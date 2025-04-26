import { createSlice } from "@reduxjs/toolkit";
import { VideoImageAPI } from "../../services/videos-images";

const ImageSlice = createSlice({
  name: "image",
  initialState: {
    image: null,
    listVideosImages: [],
  },
  reducers: {
    isImageSlice: (state, action) => {
      state.image = action.payload;
    },
    isDeleteImage: (state) => {
      state.image = null;
    },
    isListVideosImages: (state, action) => {
      state.listVideosImages = action.payload;
    },
    isDeleteVideosImages: (state, action) => {
      state.listVideosImages = state.listVideosImages.filter(
        (_, ind) => ind !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(VideoImageAPI.postImage.fulfilled, (state, action) => {
        state.image = action.payload?.data[0];
      })
      .addCase(VideoImageAPI.postVideosImages.fulfilled, (state, action) => {
        state.listVideosImages = [
          ...(state.listVideosImages || []),
          ...action.payload?.data,
        ];
      });
  },
});

export const {
  isImageSlice,
  isDeleteVideosImages,
  isListVideosImages,
  isDeleteImage,
} = ImageSlice.actions;

export default ImageSlice;
