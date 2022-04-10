//styles
import style from "./loader.module.css";

function Loader() {
  return (
    <>
      <div className={`${style.loader} text text_type_main-large`}>
        Загрузка...
      </div>
    </>
  );
}

export default Loader;
