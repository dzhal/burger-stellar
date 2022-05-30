import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/app-hooks";
import { openOrderDetails } from "../../services/modal-slice";
import { getOrdersFeed } from "../../services/orders-slice";
import formatDate from "../../utils/format-date";
//styles
import styles from "./order-details.module.css";

type TIngredientsOrderDetails = {
  _id: string;
  image_mobile: string;
  name: string;
  price: number;
  count?: number;
};

function OrderDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.wsOrders);
  const { userOrders } = useAppSelector((state) => state.auth);
  const { staticOrders } = useAppSelector((state) => state.orders);
  const { burgerIngredients } = useAppSelector(
    (state) => state.burgerIngredients
  );
  const { orderDetails } = useAppSelector((state) => state.modal);
  const order =
    [...orders, ...userOrders, ...staticOrders].find(
      (item) => item._id === id
    ) || null;
  const currentIngredients: TIngredientsOrderDetails[] =
    burgerIngredients.filter((item) => order?.ingredients.includes(item._id));

  const withCount = currentIngredients.map((item) => ({
    ...item,
    count: order?.ingredients.filter((id) => id === item._id).length || 0,
  }));

  const summ = withCount.reduce(
    (acc, { price, count }) => acc + price * count,
    0
  );
  useEffect(() => {
    dispatch(getOrdersFeed());
  }, []);
  useEffect(() => {
    if (!orderDetails._id) {
      let detailedObject = staticOrders.find((item) => item._id === id);
      if (detailedObject) {
        dispatch(openOrderDetails(detailedObject));
      }
    }
  }, [dispatch, orderDetails, id, staticOrders]);

  return (
    order && (
      <div className={`${styles.container}`}>
        <div
          className={`${styles.order_number} text text_type_digits-default mb-10`}
        >
          #{order.number}
        </div>
        <div className="text text_type_main-medium mb-3">{order.name}</div>
        <div
          className={`${styles.order_status} text text_type_main-default mb-15`}
        >
          {order.status === "done" ? "Выполнено" : "Готовится"}
        </div>
        <div className="text text_type_main-medium mb-6">Состав:</div>
        <div className={`${styles.order_ingredients} mb-10`}>
          {withCount.map((item, index) => {
            return (
              <li
                key={index}
                className={`${styles.ingredient_info} text text_type_main-default mr-6`}
              >
                <div className={styles.ingredient}>
                  <div className={styles.image_container}>
                    <img
                      className={styles.order_image}
                      src={item.image_mobile}
                      alt=""
                    />
                  </div>
                  <div className={styles.name}>{item.name}</div>
                </div>
                <div
                  className={`${styles.price_info} text text_type_digits-default`}
                >
                  {`${item.count} x ${item.price}`}
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </div>
        <div className={styles.order_time_price}>
          <div
            className={`${styles.order_time} text text_type_main-default text_color_inactive`}
          >
            {formatDate(order.createdAt)}
          </div>
          <div
            className={`${styles.order_price} text text_type_digits-default`}
          >
            {summ}
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    )
  );
}

export default React.memo(OrderDetails);
