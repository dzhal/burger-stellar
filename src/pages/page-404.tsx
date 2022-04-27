import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import logo from "../images/logo.svg";
import { useNavigate } from "react-router-dom";

import styles from "./auth.module.css";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.container}  text text_type_main-large`}>
      Страница не найдена
      <div className={`${styles.text404} mb-6`}>
        4
        <img className={styles.logo} src={logo} alt="logo" />4
      </div>
      <div className={`${styles.form} mb-20`}>
        <Button onClick={() => navigate("/")}>Вернуться на главную</Button>
      </div>
    </div>
  );
};

export default Page404;
