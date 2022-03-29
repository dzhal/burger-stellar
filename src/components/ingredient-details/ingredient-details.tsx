import style from "./ingredient-details.module.css";
import PropTypes from "prop-types";
interface IngredientDetailsProps {
    detailedInfo: any;
}

function IngredientDetails({ detailedInfo }: IngredientDetailsProps) {
    return (
        <div className={`${style.container}`}>
            <div className={style.image}>
                <img src={detailedInfo?.image_large} alt={detailedInfo?.name} />
            </div>
            <span
                className={`${style.name} text text_type_main-medium mt-4 mb-8`}
            >
                {detailedInfo?.name}
            </span>
            <div className={`${style.nutrition}`}>
                <div className={`${style.nutritionItem} text_color_inactive`}>
                    <span
                        className={`${style.detailsName} text text_type_main-default`}
                    >
                        Калории,ккал
                    </span>
                    <span
                        className={`${style.detailsValue} text_type_digits-default`}
                    >
                        {detailedInfo?.calories}
                    </span>
                </div>
                <div className={`${style.nutritionItem} text_color_inactive`}>
                    <span
                        className={`${style.detailsName} text text_type_main-default`}
                    >
                        Белки, г
                    </span>
                    <span
                        className={`${style.detailsValue} text_type_digits-default`}
                    >
                        {detailedInfo?.proteins}
                    </span>
                </div>
                <div className={`${style.nutritionItem} text_color_inactive`}>
                    <span
                        className={`${style.detailsName} text text_type_main-default`}
                    >
                        Жиры, г
                    </span>
                    <span
                        className={`${style.detailsValue} text_type_digits-default`}
                    >
                        {detailedInfo?.fat}
                    </span>
                </div>
                <div className={`${style.nutritionItem} text_color_inactive`}>
                    <span
                        className={`${style.detailsName} text text_type_main-default`}
                    >
                        Углеводы, г
                    </span>
                    <span
                        className={`${style.detailsValue} text_type_digits-default`}
                    >
                        {detailedInfo?.carbohydrates}
                    </span>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    detailedInfo: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number,
            image: PropTypes.string,
            image_mobile: PropTypes.string,
            image_large: PropTypes.string.isRequired,
            __v: PropTypes.number.isRequired,
        })
};

export default IngredientDetails;
