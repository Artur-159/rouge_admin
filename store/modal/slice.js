import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "ModalSlice",
  initialState: {
    modal: false,
  },
  reducers: {
    isModalOpen: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { isModalOpen } = ModalSlice.actions;
export default ModalSlice;
