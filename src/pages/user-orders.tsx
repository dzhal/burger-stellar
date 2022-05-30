import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TOrder } from "../@type/types";
import Loader from "../components/loader/loader";
import OrdersFeedItem from "../components/orders-feed-item/orders-feed-item";
import { useAppDispatch, useAppSelector } from "../services/app-hooks";
import { openOrderDetails } from "../services/modal-slice";
import { WS_ORDER_ACTIONS } from "../services/ws-orders/ws-orders-slice";
import { getToken } from "../utils/cookie-utils";
import styles from "./user-orders.module.css";

const UserOrders = () => {
  const accessToken = getToken("token");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { orders, wsConnected } = useAppSelector((state) => state.wsOrders);
  const clickHandler = (id: string) => () => {
    console.log("click");
    let detailedObject = orders.find((item) => item._id === id);
    if (detailedObject) {
      navigate(`${location.pathname}/${id}`, {
        state: { backgroundLocation: location },
      });
      dispatch(openOrderDetails(detailedObject));
    }
  };
  let sortedOrders = [] as TOrder[];
  useEffect(() => {
    if (accessToken) {
      dispatch({ type: WS_ORDER_ACTIONS.wsInitPerson });
    }

    return () => {
      dispatch({ type: WS_ORDER_ACTIONS.wsClose });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  if (orders) {
    sortedOrders = [...orders].sort((a, b) => b.number - a.number);
  } else return null;

  return !wsConnected ? (
    <Loader />
  ) : (
    <div className={`${styles.feed}`}>
      {sortedOrders.map((order) => (
        <li key={order._id} onClick={clickHandler(order._id)}>
          <OrdersFeedItem status={true} order={order} />
        </li>
      ))}
    </div>
  );
};

export default React.memo(UserOrders);
