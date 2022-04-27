import { ChangeEvent, FocusEvent, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/password-input";
import { TFormRegister } from "../@type/types";
import { useAppDispatch } from "../services/app-hooks";
import { register } from "../services/auth-slice";
import { regexEmail } from "../utils/regex-email";
import styles from "./auth.module.css";

const Register = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const form: TFormRegister = {
    name: name,
    email: email,
    password: password,
  };
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
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
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register(form));
    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <div className={styles.container}>
      <div className="text text_type_main-medium mb-6">Регистрация</div>
      <form className={`${styles.form} mb-20`}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChangeName}
          value={name}
          name={"name"}
        />
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
        <Button onClick={handleSubmit} type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.formHelper}>
        <div className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link to="/login" className={styles.formLink}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
