import { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { adminRoutes, subRoutes, guestRoutes } from "../../router/page-routes";
import clsx from "clsx";

import style from "./header.module.scss";

const Header = ({ className }) => {
  const navigate = useNavigate();

  const { isAuth } = useSelector((state) => state.authorization);
  const adminRole = localStorage.getItem("adminRole");

  const logout = () => {
    //dispatch(AuthorizationAPI.postLogout());
    localStorage.removeItem("adminRole");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={clsx(className, style.header)}>
      <img src="/logo.svg" alt="logo" className={style.header__logo} />
      <nav className={style.header_link}>
        {isAuth && (adminRole === "3" || adminRole === "2")
          ? adminRoutes.map((item, index) => {
              return (
                <ul key={index}>
                  <NavLink
                    to={item.path}
                    className={style.link}
                    onClick={
                      item.name === "logout"
                        ? () => {
                            logout();
                          }
                        : null
                    }
                  >
                    {item.text}
                  </NavLink>
                  {item.children?.map((itm, idx) => {
                    return itm.name ? (
                      <li key={idx}>
                        <NavLink to={itm.path} className={style.link}>
                          {itm.text}
                        </NavLink>
                      </li>
                    ) : null;
                  })}
                </ul>
              );
            })
          : isAuth && adminRole === "1"
          ? subRoutes.map((item, index) => (
              <Fragment key={index}>
                <NavLink
                  to={item.path}
                  className={style.link}
                  onClick={
                    item.name === "logout"
                      ? () => {
                          logout();
                        }
                      : null
                  }
                >
                  {item.text}
                  {item.children?.map((itm, index) => {
                    return itm.name ? (
                      <li key={index}>
                        <NavLink to={itm.path} className={style.link}>
                          {itm.text}
                        </NavLink>
                      </li>
                    ) : null;
                  })}
                </NavLink>
              </Fragment>
            ))
          : guestRoutes.map((item, index) => (
              <NavLink
                key={`key=${index}`}
                to={item.path}
                className={style.link}
              >
                {item.text}
              </NavLink>
            ))}
      </nav>
    </div>
  );
};

export default Header;
