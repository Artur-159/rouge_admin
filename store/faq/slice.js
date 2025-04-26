import { createSlice } from "@reduxjs/toolkit";
import { FaqAPI } from "../../services/FAQ";

const FAQ = createSlice({
  name: "FAQ slice",
  initialState: {
    listFAQ: [],
    oneList: [],
    deleteFAQId: null,
    status: null,
  },
  reducers: {
    isStatusText: (state, action) => {
      state.status = action.payload;
    },
    isDeleteFAQId: (state, action) => {
      state.deleteFAQId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FaqAPI.getFAQ.fulfilled, (state, action) => {
        state.listFAQ = action.payload.data.data.faqs;
      })
      .addCase(FaqAPI.getOneFAQ.fulfilled, (state, action) => {
        state.oneList = action.payload.data.data;
      })
      .addCase(FaqAPI.postFAQ.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })
      .addCase(FaqAPI.putUpdateFAQ.fulfilled, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(FaqAPI.deleteFAQ.fulfilled, (state) => {
        state.listFAQ = state.listFAQ.filter(
          (item) => item.id !== state.deleteFAQId
        );
      });
  },
});

export const { isStatusText, isDeleteFAQId } = FAQ.actions;
export default FAQ;
