import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import { CurrencyIcon } from "../../images/currency-custom";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import style from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { ingredientTypes } from "../../utils/ingredientTypes";
import { useContext } from "react";
import { ConstructorDataContext } from "../../context/constructorDataContext";
import { DataContextType } from "../../@type/types";
import { URL_POST_ORDER } from "../../utils/fetch-urls";

interface BurgerConstructorProps {
  openOrderSuccess: () => void;
  setOrderID: (id: number) => void;
}

function BurgerConstructor({
  openOrderSuccess,
  setOrderID,
}: BurgerConstructorProps) {
  const { constructorData, setСonstructorData }: DataContextType = useContext(
    ConstructorDataContext
  );
  const bun = constructorData.find((item) => item.type === ingredientTypes.BUN);
  const deleteHandler = (id: string) => {
    setСonstructorData(constructorData.filter((item) => item._id !== id));
  };
  const orderHandler = () => {
    fetch(URL_POST_ORDER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: constructorData.map((item) => item._id),
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response.status);
      })
      .then((data) => {
        setOrderID(data.order.number);
      })
      .catch((error) => console.log(`${error.name}: ${error.message}`));
  };
  const clickOrderHandler = () => {
    orderHandler();
    openOrderSuccess();
  };
  return (
    <>
      <div className={`${style.container}`}>
        <div className={`${style.ingredientList} mt-25 mb-10`}>
          <div className={`${style.ingredientFirstItem}`}>
            {bun ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ) : (
              <div className={`${style.topBun} text text_type_main-default`}>
                Выберите булку
              </div>
            )}
          </div>
          <div className={`${style.ingredientSubList}`}>
            <ul>
              {constructorData.map(
                (item, index) =>
                  item.type !== ingredientTypes.BUN && (
                    <li
                      className={`${style.ingredientItem} mt-4 mb-4`}
                      key={index}
                    >
                      <DragIcon type="primary" />
                      <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                        handleClose={() => deleteHandler(item._id)}
                      />
                    </li>
                  )
              )}
            </ul>
          </div>

          <div className={`${style.ingredientLastItem}`}>
            {bun ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ) : (
              <div className={`${style.bottomBun} text text_type_main-default`}>
                Выберите булку
              </div>
            )}
          </div>
        </div>
        <div className={`${style.order} mr-4`}>
          <div className={`${style.totalPrice}`}>
            <div
              className={`${style.sum} text text_type_digits-medium mr-2 pr-4`}
            >
              {constructorData.reduce((sum, { price }) => sum + price, 0) +
                (bun ? bun.price : 0)}
            </div>
            <CurrencyIcon type="custom" size="big" />
          </div>
          <Button type="primary" size="medium" onClick={clickOrderHandler}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
}

BurgerConstructor.propTypes = {
  openOrderSuccess: PropTypes.func.isRequired,
  setOrderID: PropTypes.func.isRequired,
};

export default BurgerConstructor;
