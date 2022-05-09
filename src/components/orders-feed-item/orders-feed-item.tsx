import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TOrder } from "../../@type/types";
import { useAppSelector } from "../../services/app-hooks";
import formatDate from "../../utils/format-date";

import styles from "./orders-feed-item.module.css";

interface OrderProps {
  order: TOrder;
  status: boolean;
}

const OrdersFeedItem: React.FC<OrderProps> = ({ order, status }) => {
  const { burgerIngredients } = useAppSelector(
    (state) => state.burgerIngredients
  );
  const navigate = useNavigate();
  const location = useLocation();
  const handleOrderDetails = () => {
    navigate(`${location.pathname}/${order._id}`);
  };
  const summ = order.ingredients.reduce((acc, id) => {
    let ingrd = burgerIngredients.find((item) => item._id === id);
    return acc + (ingrd?.price || 0);
  }, 0);

  return (
    <>
      <div onClick={handleOrderDetails} className={`${styles.container} p-6`}>
        <div className={styles.order_header}>
          <div className={`text text_type_digits-default`}>#{order.number}</div>
          <div className={`text text_type_main-default text_color_inactive`}>
            {formatDate(order.createdAt)}
          </div>
        </div>
        <div className={`text text_type_main-medium`}>{order.name}</div>
        {status && (
          <div className={`text text_type_main-default`}>
            {order.status === "done" ? (
              <span className={`${styles.order_status_done}`}>Выполнено</span>
            ) : (
              <span>Готовится</span>
            )}
          </div>
        )}

        <div className={styles.order_content}>
          <div className={styles.order_ingredients}>
            {order.ingredients.map((item, index) => {
              if (index < 5) {
                return (
                  <div
                    key={index}
                    className={styles.image_container}
                    style={{
                      zIndex: `${10 - index}`,
                    }}
                  >
                    <img
                      className={styles.order_image}
                      src={
                        burgerIngredients.find((ingr) => ingr._id === item)
                          ?.image_mobile
                      }
                      alt={
                        burgerIngredients.find((ingr) => ingr._id === item)
                          ?.name
                      }
                    />
                  </div>
                );
              }
              if (index === 5) {
                return (
                  <div
                    key={index}
                    className={styles.image_container}
                    style={{
                      zIndex: `${10 - index}`,
                    }}
                  >
                    {order.ingredients.length > 6 && (
                      <>
                        <div
                          className={`${styles.ingredient_count_cover} text text_type_main-default`}
                        ></div>
                        <div
                          className={`${styles.ingredient_count} text text_type_main-default`}
                        >
                          +{order.ingredients.length - 6}
                        </div>
                      </>
                    )}

                    <img
                      className={styles.order_image}
                      src={
                        burgerIngredients.find((ingr) => ingr._id === item)
                          ?.image_mobile
                      }
                      alt={
                        burgerIngredients.find((ingr) => ingr._id === item)
                          ?.name
                      }
                    />
                  </div>
                );
              }
              return <div key={index}></div>;
            })}
          </div>
          <div
            className={`${styles.order_price} text text_type_digits-default`}
          >
            {summ}
            {<CurrencyIcon type="primary" />}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(OrdersFeedItem);
