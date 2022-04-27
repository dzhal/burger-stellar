import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import React, { SyntheticEvent, useCallback } from "react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../services/app-hooks";
import { updateUser } from "../services/auth-slice";
import { regexEmail } from "../utils/regex-email";
import styles from "./profile.module.css";

const EditUser = () => {
  const dispatch = useAppDispatch();
  const { name, email, accessToken, refreshToken } = useAppSelector(
    (state) => state.auth
  );
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

  const handleUserEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(refreshToken);
    if (isEddited && !emailError) {
      dispatch(
        updateUser({
          name: tempName,
          email: tempEmail,
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      );
    }
  };
  const onCancelEdit = () => {
    setTempName(name);
    setTempEmail(email);
  };
  useEffect(() => {
    setTempName(name);
    setTempEmail(email);
  }, [name, email]);
  useEffect(() => {
    validateEmail();
  }, [tempEmail, validateEmail]);
  return (
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
          <Button type="secondary" size="medium" onClick={onCancelEdit}>
            Отменить
          </Button>
          <Button type="primary" size="medium" onClick={handleUserEdit}>
            Сохранить
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(EditUser);
