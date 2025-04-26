import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import Authorization from "./authorization/slice";
import ImageSlice from "./image/slice";
import Brand from "./brand/slice";
import FAQ from "./faq/slice";
import ModalSlice from "./modal/slice";
import About from "./about/slice";
import Vacancy from "./vacancy/slice";
import Service from "./service/slice";
import Branch from "./branch/slice";
import Home from "./home/slice";
import Blog from "./blog/slice";
import Banner from "./banner/slice";
import Story from "./story/slice";
import TopText from "./top-text/slice";
import Contact from "./contact/slice";
import Pagination from "./pagination/slice";
import Product from "./product/slice";

export const store = configureStore({
  reducer: {
    authorization: Authorization.reducer,
    image: ImageSlice.reducer,
    brand: Brand.reducer,
    product: Product.reducer,
    faq: FAQ.reducer,
    modal: ModalSlice.reducer,
    about: About.reducer,
    vacancy: Vacancy.reducer,
    service: Service.reducer,
    branch: Branch.reducer,
    home: Home.reducer,
    blog: Blog.reducer,
    banner: Banner.reducer,
    story: Story.reducer,
    topText: TopText.reducer,
    contactUs: Contact.reducer,
    pagination: Pagination.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
  devTools: process.env.REACT_APP_ENV !== "dev",
});
