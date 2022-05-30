import React from "react";
import OrderDetails from "../components/order-detailed/order-details";
import styles from "./order-page.module.css";

const OrderPage = () => {
  return (
    <div className={styles.wrapper}>
      <OrderDetails />
    </div>
  );
};

export default React.memo(OrderPage);
