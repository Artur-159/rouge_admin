import { createSlice } from "@reduxjs/toolkit";
import { TopTextAPI } from "../../services/top-text";

const TopText = createSlice({
  name: "Top Text",
  initialState: {
    list: [],
    total: 0,
    oneTopText: [],
    deleted_id: null,
    status: false,
  },
  reducers: {
    isDeleteTopTextId: (state, action) => {
      state.deleted_id = action.payload;
    },
    isStatusText: (state) => {
      state.status = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TopTextAPI.getTopTexts.fulfilled, (state, action) => {
        state.list = action.payload.data.data.topTexts;
        state.total = action.payload.data.data.total;
      })
      .addCase(TopTextAPI.getOneTopText.fulfilled, (state, action) => {
        state.oneTopText = action.payload.data.data;
      })
      .addCase(TopTextAPI.postTopText.fulfilled, (state) => {
        state.status = true;
      })
      .addCase(TopTextAPI.putUpdateTopText.fulfilled, (state) => {
        state.status = true;
      })
      .addCase(TopTextAPI.deleteTopText.fulfilled, (state) => {
        state.list = state.list.filter((item) => item.id !== state.deleted_id);
      });
  },
});

export const { isDeleteTopTextId, isStatusText } = TopText.actions;

export default TopText;
