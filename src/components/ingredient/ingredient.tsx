import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import style from './ingredient.module.css';
import PropTypes from 'prop-types';

interface IngredientProps {
   typeIng: string;
   dataImport: Array<any>;
};

function Ingredient({ typeIng, dataImport }: IngredientProps) {
   return (
      <div className={`${style.itemList} mt-6 mb-10 pl-4 pr-4`}>
         {dataImport.filter(item => item.type === typeIng)
            .map((data, index) => (
               <li className={`${style.card} mb-8`} key={index}>
                  <Counter count={1} size="default" />
                  <img className={`${style.img}`} src={data.image} alt={data.name} />
                  <div className={`${style.price} m-1`}>
                     <p className='text text_type_digits-default pr-2'>
                        {data.price}
                     </p>
                     <CurrencyIcon type="primary" />
                  </div>
                  <div className={`${style.name} text text_type_main-default`}>
                     {data.name}
                  </div>
               </li>
            ))}
      </div>
   )
};

Ingredient.propTypes = {
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
};

export default Ingredient;