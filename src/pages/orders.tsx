import React from "react";
import styles from "./profile.module.css";

const Orders = () => {
  return (
    <div className={`${styles.content}`}>
      <div className="text text_type_main-medium">Тут будут заказы</div>
    </div>
  );
};

export default React.memo(Orders);
