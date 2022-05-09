import React, {
  ChangeEvent,
  FocusEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { useAppDispatch, useAppSelector } from "../services/app-hooks";
import { forgotPassword } from "../services/auth-slice";
import { regexEmail } from "../utils/regex-email";
import styles from "./auth.module.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { canResetPassword } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (regexEmail.test(e.target.value)) {
      setEmailError(false);
    }
    setEmail(e.target.value);
  };

  const validateEmail = (e: FocusEvent<HTMLInputElement>) => {
    if (!regexEmail.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (email) {
      dispatch(forgotPassword(email));
    } else {
      setEmailError(true);
    }
  };

  useEffect(() => {
    if (canResetPassword) {
      navigate("/reset-password");
    }
  });

  return (
    <div className={styles.container}>
      <div className="text text_type_main-medium mb-6">
        Восстановление пароля
      </div>
      <form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
        <Input
          type={"email"}
          placeholder={"Укажите e-mail"}
          onChange={handleChangeEmail}
          onBlur={validateEmail}
          value={email}
          name={"email"}
          error={emailError}
          errorText={"Проверьте корректность почты"}
        />
        <Button type="primary" size="medium" htmlType="submit">
          Восстановить
        </Button>
      </form>
      <div className={styles.formHelper}>
        <div className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to="/login" className={styles.formLink}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ForgotPassword);
