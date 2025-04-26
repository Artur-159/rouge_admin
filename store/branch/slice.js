import { createSlice } from "@reduxjs/toolkit";
import { BranchAPI } from "../../services/branch";

const Branch = createSlice({
  name: "Branch slice",
  initialState: {
    branches: [],
    oneBranch: [],
    deleteBranch: null,
    status: null,
  },
  reducers: {
    isStatusText: (state, action) => {
      state.status = action.payload;
    },
    isDeleteBranch: (state, action) => {
      state.deleteBranch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BranchAPI.getBranch.fulfilled, (state, action) => {
        state.branches = action.payload.data.data.branches;
      })
      .addCase(BranchAPI.postBranch.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })
      .addCase(BranchAPI.deleteBranch.fulfilled, (state) => {
        state.branches = state.branches?.filter(
          (item) => item.id !== state.deleteBranch
        );
      })
      .addCase(BranchAPI.getOneBranch.fulfilled, (state, action) => {
        state.oneBranch = action.payload.data.data;
      })
      .addCase(BranchAPI.putUpdateBranch.fulfilled, (state, action) => {
        state.status = action.payload.status;
      });
  },
});

export const { isStatusText, isDeleteBranch } = Branch.actions;
export default Branch;
