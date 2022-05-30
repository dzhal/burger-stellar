import React, { useEffect } from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import Loader from "../components/loader/loader";
import { useAppDispatch, useAppSelector } from "../services/app-hooks";
import { getUser, logout, setLoggedIn } from "../services/auth-slice";
import { getToken } from "../utils/cookie-utils";
import styles from "./profile.module.css";

const Profile = () => {
  const dispatch = useAppDispatch();
  const refreshToken: string = localStorage.getItem("refreshToken") || "";
  const accessToken = getToken("token");
  const { userLoading, name, email } = useAppSelector((state) => state.auth);
  const isEditUser = useMatch("/profile");
  const isOrders = useMatch("/profile/orders");

  const handleLogout = () => {
    dispatch(logout(refreshToken));
  };
  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    } else {
      dispatch(setLoggedIn(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (accessToken && (!name || !email)) {
      dispatch(getUser());
    }
  }, [dispatch, accessToken, name, email]);

  // useEffect(() => {
  //   if (!wsConnected) {
  //     dispatch({ type: WS_ORDER_ACTIONS.wsInitPerson });
  //   }
  //   return () => {
  //     dispatch({ type: WS_ORDER_ACTIONS.wsClose });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return userLoading || !name || !email ? (
    <Loader />
  ) : (
    <div className={`${styles.container}`}>
      <div className={`${styles.menu} text text_type_main-medium mr-15`}>
        <Link to="/profile" className={`${styles.menu_item}`}>
          <span className={`${isEditUser ? "" : "text_color_inactive"}`}>
            Профиль
          </span>
        </Link>
        <Link to="/profile/orders" className={`${styles.menu_item}`}>
          <span className={`${isOrders ? "" : "text_color_inactive"}`}>
            История заказов
          </span>
        </Link>
        <div
          onClick={handleLogout}
          className={`${styles.menu_item} text_color_inactive`}
        >
          <span className="text_color_inactive">Выход</span>
        </div>
        {isEditUser ? (
          <div
            className={`${styles.menu_description} text text_type_main-default text_color_inactive mt-20`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </div>
        ) : (
          <div
            className={`${styles.menu_description} text text_type_main-default text_color_inactive mt-20`}
          >
            В этом разделе вы можете просмотреть свою историю заказов
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default React.memo(Profile);
