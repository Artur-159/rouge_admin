import { createSlice } from "@reduxjs/toolkit";
import { AboutAPI } from "../../services/about";

const About = createSlice({
  name: "About slice",
  initialState: {
    data: [],
    status: null,
  },
  reducers: {
    isStatusText: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AboutAPI.getAbout.fulfilled, (state, action) => {
        state.data = action.payload.data.data;
      })
      .addCase(AboutAPI.postAbout.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      });
  },
});

export const { isStatusText } = About.actions;
export default About;
