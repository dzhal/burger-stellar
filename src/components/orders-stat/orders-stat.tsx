import React from "react";
import { useAppSelector } from "../../services/app-hooks";

import styles from "./orders-stat.module.css";

function OrdersStat() {
  const { total, totalToday, orders } = useAppSelector(
    (state) => state.wsOrders
  );
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={styles.status}>
          <div className={styles.orders_ready}>
            <h2
              className={`${styles.status_subtitle} text text_type_main-medium pb-6`}
            >
              Готовы:
            </h2>
            <div className={styles.orders_ready_ids}>
              {orders
                .filter((order) => order.status === "done")
                .map((order, index) => {
                  if (index < 15)
                    return (
                      <li
                        key={order._id}
                        className={`${styles.orders_ready_id} text text_type_digits-default`}
                      >
                        {order.number}
                      </li>
                    );
                  return null;
                })}
            </div>
          </div>
          <div className={styles.orders_inprogress}>
            <h2
              className={`${styles.status_subtitle} text text_type_main-medium pb-6`}
            >
              В работе:
            </h2>
            <div className={styles.orders_inprogress_ids}>
              {orders
                .filter(
                  (order) =>
                    order.status === "pending" || order.status === "created"
                )
                .map((order, index) => {
                  if (index < 15)
                    return (
                      <li
                        key={order._id}
                        className={`${styles.orders_inprogress_id} text text_type_digits-default`}
                      >
                        {order.number}
                      </li>
                    );
                  return null;
                })}
            </div>
          </div>
        </div>
        <div className={`${styles.done_alltime} mt-15`}>
          <h2
            className={`${styles.status_subtitle} text text_type_main-medium pb-6`}
          >
            Выполнено за все время:
          </h2>
          <div className={`${styles.stat_count} text text_type_digits-large`}>
            {total}
          </div>
        </div>
        <div className={`${styles.done_today} mt-15`}>
          <h2
            className={`${styles.status_subtitle} text text_type_main-medium pb-6`}
          >
            Выполнено за сегодня:
          </h2>
          <div className={`${styles.stat_count} text text_type_digits-large`}>
            {totalToday}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(OrdersStat);
