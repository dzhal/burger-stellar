import React, { useEffect } from "react";
import OrdersFeedItem from "../components/orders-feed-item/orders-feed-item";
import { useAppDispatch, useAppSelector } from "../services/app-hooks";
import { getUserOrders } from "../services/auth-slice";
import styles from "./user-orders.module.css";

const UserOrders = () => {
  const dispatch = useAppDispatch();
  const { userOrders } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

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
