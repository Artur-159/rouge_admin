import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isAuthentication } from "./store/authorization/slice";
import { isOneBanner, isStatusText } from "./store/banner/slice";
import { isImageSlice } from "./store/image/slice";
import MainRoutes from "./router/main-router";
import Layout from "./components/layout/layout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isStatusText(false));
    dispatch(isOneBanner(false));
    dispatch(isImageSlice(false));
    const isAuth = localStorage.getItem("token");
    const adminRole = localStorage.getItem("adminRole");
    if (isAuth) {
      dispatch(isAuthentication({ isAuth, adminRole }));
    }
  }, [dispatch]);
  return (
    <Layout>
      <MainRoutes />
    </Layout>
  );
}

export default App;
