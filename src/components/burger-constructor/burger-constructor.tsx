import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon';
import style from './burger-constructor.module.css';
import PropTypes from 'prop-types';

function BurgerConstructor() {
    const dataArray = [
        {
            "_id": "60666c42cc7b410027a1a9b1",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        },
        {
            "_id": "60666c42cc7b410027a1a9b5",
            "name": "Говяжий метеорит (отбивная)",
            "type": "main",
            "proteins": 800,
            "fat": 800,
            "carbohydrates": 300,
            "calories": 2674,
            "price": 3000,
            "image": "https://code.s3.yandex.net/react/code/meat-04.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
            "__v": 0
        },
        {
            "_id": "60666c42cc7b410027a1a9b7",
            "name": "Соус Spicy-X",
            "type": "sauce",
            "proteins": 30,
            "fat": 20,
            "carbohydrates": 40,
            "calories": 30,
            "price": 90,
            "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            "__v": 0
        },
        {
            "_id": "60666c42cc7b410027a1a9be",
            "name": "Мини-салат Экзо-Плантаго",
            "type": "main",
            "proteins": 1,
            "fat": 2,
            "carbohydrates": 3,
            "calories": 6,
            "price": 4400,
            "image": "https://code.s3.yandex.net/react/code/salad.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
            "__v": 0
        },
        {
            "_id": "60666c42cc7b410027a1a9be",
            "name": "Мини-салат Экзо-Плантаго",
            "type": "main",
            "proteins": 1,
            "fat": 2,
            "carbohydrates": 3,
            "calories": 6,
            "price": 4400,
            "image": "https://code.s3.yandex.net/react/code/salad.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
            "__v": 0
        },
        {
            "_id": "60666c42cc7b410027a1a9be",
            "name": "Мини-салат Экзо-Плантаго",
            "type": "main",
            "proteins": 1,
            "fat": 2,
            "carbohydrates": 3,
            "calories": 6,
            "price": 4400,
            "image": "https://code.s3.yandex.net/react/code/salad.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
            "__v": 0
        },
        {
            "_id": "60666c42cc7b410027a1a9bf",
            "name": "Сыр с астероидной плесенью",
            "type": "main",
            "proteins": 84,
            "fat": 48,
            "carbohydrates": 420,
            "calories": 3377,
            "price": 4142,
            "image": "https://code.s3.yandex.net/react/code/cheese.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
            "__v": 0
        },
    ];
    let isBun = dataArray.find(item => item.type === 'bun');
    return (
        <>
            <div className={`${style.container}`}>
                <div className={`${style.ingredientList} mt-25 mb-10`}>
                    <div className={`${style.IngredientFirstItem}`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={isBun ? isBun.name : ''}
                            price={isBun ? isBun.price : 0}
                            thumbnail={isBun ? isBun.image : ''}
                        />
                    </div>
                    <div className={`${style.ingredientSubList}`}>
                        <ul>
                            {dataArray.map((item, index) => (item.type !== 'bun' &&
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
                            text={isBun ? isBun.name : ''}
                            price={isBun ? isBun.price : 0}
                            thumbnail={isBun ? isBun.image : ''}
                        />
                    </div>
                </div>
                <div className={`${style.order} mr-4`}>
                    <div className={`${style.totalPrice}`}>
                        <div className={`${style.sum} text text_type_digits-medium mr-2 pr-4`}>
                            {dataArray.reduce((sum, {price}) => sum + price, 0) + (isBun ? isBun.price : 0)}
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

BurgerConstructor.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  };

export default BurgerConstructor;
