import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon';
import style from './burger-constructor.module.css';
import { dataImport } from '../../utils/data';
import { types } from '../../utils/types';

function BurgerConstructor() {
    const isBun = dataImport.find(item => item.type === types.BUN);
    return (
        <>
            <div className={`${style.container}`}>
                <div className={`${style.ingredientList} mt-25 mb-10`}>
                    <div className={`${style.IngredientFirstItem}`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={isBun ? `${isBun.name} (верх)` : ''}
                            price={isBun ? isBun.price : 0}
                            thumbnail={isBun ? isBun.image : ''}
                        />
                    </div>
                    <div className={`${style.ingredientSubList}`}>
                        <ul>
                            {dataImport.map((item, index) => (item.type !== types.BUN &&
                                <li className={`${style.IngredientItem} mt-4 mb-4`} key={index}>
                                    <DragIcon type="primary" />
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`${style.IngredientLastItem}`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={isBun ? `${isBun.name} (низ)` : ''}
                            price={isBun ? isBun.price : 0}
                            thumbnail={isBun ? isBun.image : ''}
                        />
                    </div>
                </div>
                <div className={`${style.order} mr-4`}>
                    <div className={`${style.totalPrice}`}>
                        <div className={`${style.sum} text text_type_digits-medium mr-2 pr-4`}>
                            {dataImport.reduce((sum, {price}) => sum + price, 0) + (isBun ? isBun.price : 0)}
                        </div>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </>
    )
}

export default BurgerConstructor;
