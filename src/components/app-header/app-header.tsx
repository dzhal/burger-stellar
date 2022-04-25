//libs
import React from "react";
import { Link, useMatch } from "react-router-dom";
//components
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/burger-icon";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/list-icon";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/profile-icon";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";
//styles
import styles from "./app-header.module.css";

function AppHeader() {
  const isLogin = useMatch("/login");
  const isProfile = useMatch("/profile/*");
  const isConstructor = useMatch("/");
  const isOrderFeed = useMatch("/feed");
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <nav className={styles.nav}>
          <div className={styles.navMenu}>
            <Link
              to="/"
              className={`${styles.navMenuItem} text text_type_main-default pl-5 pr-5 pb-4 pt-4`}
            >
              <div className={styles.navIcon}>
                <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
              </div>
              <span
                className={`${styles.navText} ${
                  isConstructor ? "" : "text_color_inactive"
                } ml-2`}
              >
                Конструктор
              </span>
            </Link>
            <Link
              to="/feed"
              className={`${styles.navMenuItem} text text_type_main-default pl-5 pr-5 pb-4 pt-4 ml-2`}
            >
              <div className={styles.navIcon}>
                <ListIcon type={isOrderFeed ? "primary" : "secondary"} />
              </div>
              <span
                className={`${styles.navText} ${
                  isOrderFeed ? "" : "text_color_inactive"
                } ml-2`}
              >
                Лента заказов
              </span>
            </Link>
          </div>
          <Link
            to="/profile"
            className={`${styles.navMenuItem} text text_type_main-default pl-5 pr-5 pb-4 pt-4`}
          >
            <div className={styles.navIcon}>
              <ProfileIcon
                type={isLogin || isProfile ? "primary" : "secondary"}
              />
            </div>
            <span
              className={`${styles.navText} ${
                isLogin || isProfile ? "" : "text_color_inactive"
              } ml-2`}
            >
              Личный кабинет
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default React.memo(AppHeader);
