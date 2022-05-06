import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrdersFeedItem from "../components/orders-feed-item/orders-feed-item";
import { useAppDispatch, useAppSelector } from "../services/app-hooks";
import { getUserOrders } from "../services/auth-slice";
import { getOrdersFeed } from "../services/orders-slice";
import styles from "./user-orders.module.css";

const UserOrders = () => {
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken, userOrders } = useAppSelector(
    (state) => state.auth
  );
  useEffect(() => {
    dispatch(
      getUserOrders({ accessToken: accessToken, refreshToken: refreshToken })
    );
  }, [dispatch, accessToken, refreshToken]);

  let sortedOrders = [...userOrders].sort((a, b) => b.number - a.number);

  return (
    <div className={`${styles.feed}`}>
      {sortedOrders.map((order) => (
        <li key={order._id}>
          <OrdersFeedItem status={true} order={order} />
        </li>
      ))}
    </div>
  );
};

export default React.memo(UserOrders);
