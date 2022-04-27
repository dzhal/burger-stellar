//libs
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
//helpers
import { useAppDispatch } from "../../services/app-hooks";
import { getIngredients } from "../../services/burger-ingredients-slice";
import fail from "../../images/fail.png";
//styles
import style from "./fetch-error.module.css";

function FetchError() {
  const dispatch = useAppDispatch();
  const handleRetry = () => {
    dispatch(getIngredients());
  };
  return (
    <div className={`${style.error}`}>
      <div className={`${style.error_text} text text_type_main-large mb-4`}>
        Шеф, API Практикума снова упало
        <br />
        <img className={style.image} src={fail} alt="net otveta" />
        <br />
        Вызывайте отряд магов!
      </div>
      <div className={style.button}>
        <Button type="primary" size="medium" onClick={handleRetry}>
          Попробовать еще раз
        </Button>
      </div>
    </div>
  );
}

export default FetchError;
