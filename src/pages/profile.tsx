import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import React, { SyntheticEvent, useCallback } from "react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/loader/loader";
import { useAppDispatch, useAppSelector } from "../services/app-hooks";
import {
  getUser,
  logout,
  refreshingToken,
  updateUser,
} from "../services/auth-slice";
import { getToken } from "../utils/cookie-utils";
import { regexEmail } from "../utils/regex-email";
import styles from "./profile.module.css";

const Profile = () => {
  const dispatch = useAppDispatch();
  const accessToken = getToken("accessToken");
  const refreshToken = getToken("token");
  const { name, email, userLoading } = useAppSelector((state) => state.auth);
  const [tempName, setTempName] = useState(name);
  const [isNameDisabled, setIsNameDisabled] = useState(true);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [tempEmail, setTempEmail] = useState(email);
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState(false);
  const isEddited = tempName !== name || tempEmail !== email;

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };
  const handleNameEdit = () => {
    setIsNameDisabled(false);
    setTimeout(() => inputNameRef.current?.focus(), 0);
  };
  const handleNameOnBlur = () => {
    setIsNameDisabled(true);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setTempEmail(e.target.value);
  };
  const handleEmailEdit = () => {
    setIsEmailDisabled(false);
    setTimeout(() => inputEmailRef.current?.focus(), 0);
  };
  const handleEmailOnBlur = () => {
    setIsEmailDisabled(true);
    validateEmail();
  };
  const validateEmail = useCallback(() => {
    if (!regexEmail.test(tempEmail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [tempEmail]);
  const handleLogout = () => {
    dispatch(logout(refreshToken));
  };
  const handleUserEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isEddited && !emailError) {
      dispatch(
        updateUser({
          name: tempName,
          email: tempEmail,
          accessToken: accessToken,
        })
      );
    }
  };
  const onCancelEdit = () => {
    setTempName(name);
    setTempEmail(email);
  };

  useEffect(() => {
    if (!accessToken) {
      dispatch(refreshingToken(refreshToken));
    }
    dispatch(getUser(accessToken));
  }, [dispatch, accessToken, refreshToken]);

  useEffect(() => {
    setTempName(name);
    setTempEmail(email);
  }, [name, email]);
  useEffect(() => {
    validateEmail();
  }, [tempEmail, validateEmail]);

  return userLoading ? (
    <Loader />
  ) : (
    <div className={`${styles.container}`}>
      <div className={`${styles.menu} text text_type_main-medium mr-15`}>
        <Link to="/profile" className={`${styles.menu_item}`}>
          <span>Профиль</span>
        </Link>
        <Link to="/profile/orders" className={`${styles.menu_item}`}>
          <span className="text_color_inactive">История заказов</span>
        </Link>
        <div
          onClick={handleLogout}
          className={`${styles.menu_item} text_color_inactive`}
        >
          <span className="text_color_inactive">Выход</span>
        </div>
        <div
          className={`${styles.menu_description} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>
      <div>
        <form className={styles.content}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            disabled={isNameDisabled}
            onChange={onChangeName}
            icon={isNameDisabled ? "EditIcon" : "CloseIcon"}
            onIconClick={handleNameEdit}
            onBlur={handleNameOnBlur}
            ref={inputNameRef}
            value={tempName}
            name={"name"}
            size={"default"}
          />
          <Input
            type={"email"}
            placeholder={"Логин"}
            error={emailError}
            errorText={"Проверьте корректность введенной почты"}
            disabled={isEmailDisabled}
            onChange={onChangeEmail}
            icon={isEmailDisabled ? "EditIcon" : "CloseIcon"}
            onIconClick={handleEmailEdit}
            onBlur={handleEmailOnBlur}
            ref={inputEmailRef}
            value={tempEmail}
            name={"email"}
            size={"default"}
          />
          <Input
            type={"text"}
            placeholder={"Пароль"}
            onChange={onChangeEmail}
            disabled={true}
            value={"******"}
            name={"password"}
            size={"default"}
          />
        </form>
        {isEddited && (
          <div
            className={`${styles.editHandler} mt-4 text text_type_main-default`}
          >
            <div onClick={onCancelEdit} className={styles.editHandler_cancel}>
              Отменить
            </div>
            <Button onClick={handleUserEdit}>Сохранить</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Profile);
