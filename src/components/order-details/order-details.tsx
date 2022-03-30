//libs
import PropTypes from "prop-types";
//helpers
import orderImg from "../../images/done.svg";
//styles
import style from "./order-details.module.css";

interface OrderDetailsProps {
  orderId: number;
}

function OrderDetails({ orderId }: OrderDetailsProps) {
  return (
    <>
      <div className={`${style.container}`}>
        {orderId ? (
          <>
            <div
              className={`${style.orderId} text text_type_digits-large mt-9 mb-8`}
            >
              {orderId}
            </div>
            <div className={`text text_type_main-medium mb-15`}>
              идентификатор заказа
            </div>
            <img src={orderImg} alt="order-success" height="120" width="120" />
            <div className={`text text_type_main-default mt-15`}>
              Ваш заказ начали готовить
            </div>
            <div
              className={`text text_type_main-default text_color_inactive mt-2 mb-15`}
            >
              Дождитесь готовности на орбитальной станции
            </div>
          </>
        ) : (
          <div
            className={`${style.waitingText} text text_type_digits-default mt-9 mb-8`}
          >
            Заказ в обработке. Еще чуть-чуть
          </div>
        )}
      </div>
    </>
  );
}

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default OrderDetails;
