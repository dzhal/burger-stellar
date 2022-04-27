import logo from "../../images/logo.svg";
//styles
import style from "./loader.module.css";

function Loader() {
  return (
    <>
      <div className={`${style.loader} text text_type_main-large`}>
        Загрузка
        <br />
        <img className={style.logo} src={logo} alt="logo" />
      </div>
    </>
  );
}

export default Loader;
