// import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { adminRoutes, subRoutes, guestRoutes } from "./page-routes";

const MainRoutes = () => {
  const isAuth = localStorage.getItem("token");
  const adminRole = localStorage.getItem("adminRole");
  // const { adminRole } = useSelector((state) => state.authorization);
  return (
    <Routes>
      {isAuth && adminRole === "3" ? (
        <>
          {adminRoutes?.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
          {adminRoutes?.map((item) =>
            item?.children?.map((i) => (
              <Route key={i.path} path={i.path} element={i.element} />
            ))
          )}
        </>
      ) : isAuth && adminRole === "2" ? (
        <>
          {subRoutes?.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
          {subRoutes?.map((item) =>
            item?.children?.map((i) => (
              <Route key={i.path} path={i.path} element={i.element} />
            ))
          )}
        </>
      ) : isAuth && adminRole === "1" ? (
        <>
          {subRoutes?.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
          {subRoutes?.map((item) =>
            item?.children?.map((i) => (
              <Route key={i.path} path={i.path} element={i.element} />
            ))
          )}
        </>
      ) : (
        guestRoutes?.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))
      )}
    </Routes>
  );
};

export default MainRoutes;
