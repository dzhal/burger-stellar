import React, { useState } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import IngredientList from '../ingredient-list/ingredient-list';
import PropTypes from 'prop-types';
import { types } from '../../utils/types';

interface BurgerIngredientsProps {
    data: Array<any>;
 };

function BurgerIngredients({data}: BurgerIngredientsProps) {
    const [currentTab, setCurrentTab] = useState('bunRef');
    const bunRef = React.useRef<HTMLHeadingElement>(null);
    const sauceRef = React.useRef<HTMLHeadingElement>(null);
    const mainRef = React.useRef<HTMLHeadingElement>(null);
    const scrollToBun = () => {
        bunRef.current && bunRef.current.scrollIntoView({behavior: "smooth"});
    };
    const scrollToSauce = () => {
        sauceRef.current && sauceRef.current.scrollIntoView({behavior: "smooth"});
    };
    const scrollToMain = () => {
        mainRef.current && mainRef.current.scrollIntoView({behavior: "smooth"});
    };

    function handleClickTab(e: any) {
        setCurrentTab(e);
        if (e === 'bunRef') {
            console.log(bunRef.current)
            console.log(bunRef)
            scrollToBun();
        } else if (e === 'sauceRef') {
            console.log(sauceRef.current)
            console.log(sauceRef)
            scrollToSauce();
        } else if (e === 'mainRef') {
            console.log(mainRef.current)
            console.log(mainRef)
            scrollToMain();
        }
    };
    return (
        <>
            <section className={`${style.container}`}>
                <h1 className={`${style.title} text text_type_main-large mt-10 mb-5`}>
                    Соберите бургер
                </h1>
                <div className={`${style.tabs}`}>
                    <Tab value="bunRef" active={currentTab === 'bunRef'} onClick={handleClickTab}>
                        Булки
                    </Tab>
                    <Tab value="sauceRef" active={currentTab === 'sauceRef'} onClick={handleClickTab}>
                        Соусы
                    </Tab>
                    <Tab value="mainRef" active={currentTab === 'mainRef'} onClick={handleClickTab}>
                        Начинки
                    </Tab>
                </div>
                <section className={`${style.ingredientsList} mt-10`}>
                    <h2 ref={bunRef} className='text text_type_main-medium'>Булки</h2>
                    <IngredientList dataImport={data} typeIng={types.BUN}/>
                    <h2 ref={sauceRef} className='text text_type_main-medium'>Соусы</h2>
                    <IngredientList dataImport={data} typeIng={types.SAUCE}/>
                    <h2 ref={mainRef} className='text text_type_main-medium'>Начинки</h2>
                    <IngredientList dataImport={data} typeIng={types.MAIN}/>
                </section>
            </section>

        </>

    )
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
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
       __v: PropTypes.number.isRequired
    })).isRequired
 };

export default BurgerIngredients;