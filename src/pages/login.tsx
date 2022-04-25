import { ChangeEvent, FocusEvent, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/password-input";
import { TFormLogin } from "../@type/types";
import { useAppDispatch } from "../services/app-hooks";
import { login } from "../services/auth-slice";
import { regexEmail } from "../utils/regex-email";
import styles from "./auth.module.css";

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const form: TFormLogin = {
    email: email,
    password: password,
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (regexEmail.test(email)) {
      setEmailError(false);
    }
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const validateEmail = (e: FocusEvent<HTMLInputElement>) => {
    if (!regexEmail.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const handelSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className={styles.container}>
      <div className="text text_type_main-medium mb-6">Вход</div>
      <form className={`${styles.form} mb-20`} autoComplete="on">
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={handleChangeEmail}
          onBlur={validateEmail}
          value={email}
          name={"email"}
          error={emailError}
          errorText={"Проверьте корректность почты"}
        />
        <PasswordInput
          onChange={handleChangePassword}
          value={password}
          name={"password"}
        />
        <Button onClick={handelSubmit} type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={styles.formHelper}>
        <div className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь?{" "}
          <Link to="/register" className={styles.formLink}>
            Зарегистрироваться
          </Link>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link to="/forgot-password" className={styles.formLink}>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
