//libs
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
//helpers
import { useAppDispatch } from "../../services/app-hooks";
import { getIngredients } from "../../services/burger-ingredients-slice";
//styles
import style from "./fetch-error.module.css";

function FetchError() {
  const dispatch = useAppDispatch();
  const handleRetry = () => {
    dispatch(getIngredients());
  };
  return (
    <div className={`${style.error}`}>
      <div className="text text_type_main-large">
        Ошибка при загрузке данных =(
      </div>
      <Button type="primary" size="medium" onClick={handleRetry}>
        Попробовать еще раз
      </Button>
    </div>
  );
}

export default FetchError;
