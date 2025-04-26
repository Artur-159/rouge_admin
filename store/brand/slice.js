import { createSlice } from "@reduxjs/toolkit";
import { BrandAPI } from "../../services/brand";

const BrandSlice = createSlice({
  name: "brand",
  initialState: {
    listBrands: [],
    editBrand: [],
    brandDeleteId: null,
    status: null,
  },
  reducers: {
    isEditBrand: (state, action) => {
      state.editBrand = action.payload;
    },
    isBrandDeleteId: (state, action) => {
      state.brandDeleteId = action.payload;
    },
    isStatusText: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BrandAPI.getBrandsList.fulfilled, (state, action) => {
        state.listBrands = action.payload?.data.data.brands;
      })
      .addCase(BrandAPI.postBrand.fulfilled, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(BrandAPI.getOneBrand.fulfilled, (state, action) => {
        state.editBrand = action.payload.data.data;
      })
      .addCase(BrandAPI.putOneBrand.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })
      .addCase(BrandAPI.deleteBrand.fulfilled, (state) => {
        state.status = true;
        state.listBrands = state.listBrands.filter(
          (item) => item.id !== state.deleteUsersId
        );
      });
  },
});

export const { isBrandDeleteId, isStatusText, isEditBrand } =
  BrandSlice.actions;
export default BrandSlice;
