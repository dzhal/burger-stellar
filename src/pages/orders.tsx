import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/loader/loader";
import { useAppDispatch, useAppSelector } from "../services/app-hooks";
import { getUser, logout, refreshingToken } from "../services/auth-slice";
import { getToken } from "../utils/cookie-utils";
import styles from "./profile.module.css";

const Orders = () => {
  const dispatch = useAppDispatch();
  const accessToken = getToken("accessToken");
  const { refreshToken, userLoading } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout(refreshToken));
  };
  useEffect(() => {
    if (!accessToken) {
      dispatch(refreshingToken(refreshToken));
    }
    dispatch(getUser(accessToken));
  }, [dispatch, accessToken, refreshToken]);

  return userLoading ? (
    <Loader />
  ) : (
    <div className={`${styles.container}`}>
      <div className={`${styles.menu} text text_type_main-medium mr-15`}>
        <Link to="/profile" className={`${styles.menu_item}`}>
          <span className="text_color_inactive">Профиль</span>
        </Link>
        <Link to="/profile/orders" className={`${styles.menu_item}`}>
          <span>История заказов</span>
        </Link>
        <div
          onClick={handleLogout}
          className={`${styles.menu_item} text_color_inactive`}
        >
          <span className="text_color_inactive">Выход</span>
        </div>
        <div
          className={`${styles.menu_description} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете посмотреть свою историю заказов
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default React.memo(Orders);
