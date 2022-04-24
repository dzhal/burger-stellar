import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

import styles from "./auth.module.css";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={`${styles.text404} text text_type_main-large mb-6`}>
        404: Страница не найдена [картинка "тухлый бургер"]
      </div>
      <div className={`${styles.form} mb-20`}>
        <Button onClick={() => navigate("/")}>Вернуться на главную</Button>
      </div>
    </div>
  );
};

export default Page404;
