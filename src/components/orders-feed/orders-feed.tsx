import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/app-hooks";
import { openOrderDetails } from "../../services/modal-slice";
import { WS_ORDER_ACTIONS } from "../../services/ws-orders/ws-orders-slice";
import FetchError from "../fetch-error/fetch-error";
import Loader from "../loader/loader";
import OrdersFeedItem from "../orders-feed-item/orders-feed-item";
import OrdersStat from "../orders-stat/orders-stat";

import styles from "./orders-feed.module.css";

function OrdersFeed() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { orders, wsConnected, error } = useAppSelector(
    (state) => state.wsOrders
  );
  const clickHandler = (id: string) => () => {
    let detailedObject = orders.find((item) => item._id === id);
    if (detailedObject) {
      navigate(`${location.pathname}/${id}`, {
        state: { backgroundLocation: location },
      });
      dispatch(openOrderDetails(detailedObject));
    }
  };

  useEffect(() => {
    dispatch({ type: WS_ORDER_ACTIONS.wsInit });

    return () => {
      dispatch({ type: WS_ORDER_ACTIONS.wsClose });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !wsConnected ? (
    <Loader />
  ) : error ? (
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
            <li key={order._id} onClick={clickHandler(order._id)}>
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
