import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/app-hooks";
import { getOrdersFeed } from "../../services/orders-slice";
import FetchError from "../fetch-error/fetch-error";
import Loader from "../loader/loader";
import OrdersFeedItem from "../orders-feed-item/orders-feed-item";
import OrdersStat from "../orders-stat/orders-stat";

import styles from "./orders-feed.module.css";

function OrdersFeed() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);
  const { isLoading, hasError } = useAppSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getOrdersFeed());
  }, [dispatch]);
  return isLoading ? (
    <Loader />
  ) : hasError ? (
    <FetchError />
  ) : (
    <>
      <h1
        className={`${styles.title} text text_type_main-large pt-10 pl-5 pb-5`}
      >
        Лента заказов
      </h1>
      <div className={`${styles.container} pl-5 pr-5`}>
        <div className={`${styles.feed}`}>
          {orders.map((order) => (
            <li key={order._id}>
              <OrdersFeedItem key={order.number} status={false} order={order} />
            </li>
          ))}
        </div>
        <div className={`${styles.stat}`}>
          <OrdersStat />
        </div>
      </div>
    </>
  );
}

export default React.memo(OrdersFeed);
