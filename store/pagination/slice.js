import { createSlice } from "@reduxjs/toolkit";

const Pagination = createSlice({
  name: "Pagination slice",
  initialState: {
    offset: 0,
  },
  reducers: {
    isPage: (state, action) => {
      state.offset = action.payload;
    },
  },
});

export const { isPage } = Pagination.actions;
export default Pagination;
