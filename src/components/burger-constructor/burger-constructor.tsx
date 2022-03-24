import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import { CurrencyIcon } from "../../images/currency-custom";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import style from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { types } from "../../utils/types";

interface BurgerConstructorProps {
    data: Array<any>;
    openOrderSuccess: () => void;
}

function BurgerConstructor({ data, openOrderSuccess }: BurgerConstructorProps) {
    const bun = data.find((item) => item.type === types.BUN);
    const handleClickOrder = () => {
        openOrderSuccess();
    };
    return (
        <>
            <div className={`${style.container}`}>
                <div className={`${style.ingredientList} mt-25 mb-10`}>
                    <div className={`${style.ingredientFirstItem}`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun?.name} (верх)`}
                            price={bun?.price}
                            thumbnail={bun?.image}
                        />
                    </div>
                    <div className={`${style.ingredientSubList}`}>
                        <ul>
                            {data.map(
                                (item, index) =>
                                    item.type !== types.BUN && (
                                        <li
                                            className={`${style.ingredientItem} mt-4 mb-4`}
                                            key={index}
                                        >
                                            <DragIcon type="primary" />
                                            <ConstructorElement
                                                text={item.name}
                                                price={item.price}
                                                thumbnail={item.image}
                                            />
                                        </li>
                                    )
                            )}
                        </ul>
                    </div>

                    <div className={`${style.ingredientLastItem}`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun?.name} (низ)`}
                            price={bun?.price}
                            thumbnail={bun?.image}
                        />
                    </div>
                </div>
                <div className={`${style.order} mr-4`}>
                    <div className={`${style.totalPrice}`}>
                        <div
                            className={`${style.sum} text text_type_digits-medium mr-2 pr-4`}
                        >
                            {data.reduce((sum, { price }) => sum + price, 0) +
                                bun?.price}
                        </div>
                        <CurrencyIcon type="custom" size="big" />
                    </div>
                    <Button
                        type="primary"
                        size="medium"
                        onClick={handleClickOrder}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired,
            __v: PropTypes.number.isRequired,
        })
    ).isRequired,
    openOrderSuccess: PropTypes.func.isRequired
};

export default BurgerConstructor;
