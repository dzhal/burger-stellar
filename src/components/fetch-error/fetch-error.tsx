//libs
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
//styles
import style from "./fetch-error.module.css";

interface FetchErrorProps {
  handleRetry: () => Object | void;
}

function FetchError({ handleRetry }: FetchErrorProps) {
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

FetchError.propTypes = {
  handleRetry: PropTypes.func.isRequired,
};

export default FetchError;
