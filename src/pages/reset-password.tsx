import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/password-input";
import { useAppDispatch, useAppSelector } from "../services/app-hooks";
import { resetPassword } from "../services/auth-slice";
import styles from "./auth.module.css";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { canResetPassword } = useAppSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [confirmCode, setConfirmCode] = useState("");

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setConfirmCode(e.target.value);
  };
  const form = {
    password: password,
    token: confirmCode,
  };
  const handleSubmitReset = (e: SyntheticEvent) => {
    e.preventDefault();
    if (password && confirmCode) {
      dispatch(resetPassword(form));
      setConfirmCode("");
      setPassword("");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!canResetPassword) {
      navigate("/forgot-password");
    }
  });

  return (
    <div className={styles.container}>
      <div className="text text_type_main-medium mb-6">
        Восстановление пароля
      </div>
      <form className={`${styles.form} mb-20`} onSubmit={handleSubmitReset}>
        <PasswordInput
          onChange={handleChangePassword}
          value={password}
          name={"password"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChangeCode}
          value={confirmCode}
          name={"code"}
          error={false}
          errorText={"Ошибка при проверке кода"}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
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

export default ResetPassword;
