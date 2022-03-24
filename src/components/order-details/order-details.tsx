import style from "./order-details.module.css";
import orderImg from "../../images/done.svg";

function OrderDetails() {
    return (
        <>
            <div className={`${style.container}`}>
                <div
                    className={`${style.orderId} text text_type_digits-large mt-9 mb-8`}
                >
                    034536
                </div>
                <div className={`text text_type_main-medium mb-15`}>
                    идентификатор заказа
                </div>
                <img src={orderImg} alt="order-success" />
                <div className={`text text_type_main-default mt-15`}>
                    Ваш заказ начали готовить
                </div>
                <div
                    className={`text text_type_main-default text_color_inactive mt-2 mb-15`}
                >
                    Дождитесь готовности на орбитальной станции
                </div>
            </div>
        </>
    );
}

export default OrderDetails;
