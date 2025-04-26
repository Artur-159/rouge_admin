import { createSlice } from "@reduxjs/toolkit";
import { ProductAPI } from "../../services/product";

const Product = createSlice({
  name: "Product slice",
  initialState: {
    list: [],
    oneProduct: [],
    total: null,
    status: null,
  },
  reducers: {
    isStatusText: (state, action) => {
      state.status = action.payload;
    },

    isOneProduct: (state, action) => {
      state.oneBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ProductAPI.getProducts.fulfilled, (state, action) => {
        state.list = action.payload.data.data.products;
        state.total = action.payload.data.data.total;
      })
      .addCase(ProductAPI.getOneProduct.fulfilled, (state, action) => {
        state.oneProduct = action.payload.data.data;
      })
      .addCase(ProductAPI.putUpdateProduct.fulfilled, (state, action) => {
        state.status = action.payload.status;
      });
  },
});

export const { isStatusText, isOneProduct } = Product.actions;
export default Product;
