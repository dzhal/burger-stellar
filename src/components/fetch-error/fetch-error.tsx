import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import style from './fetch-error.module.css';
import PropTypes from 'prop-types';
interface FetchError {
    handleRetry: () => Object | void;
}

function FetchError({handleRetry}: FetchError) {
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
};

FetchError.PropTypes = {
    handleRetry: PropTypes.func.isRequired
}

export default FetchError;
