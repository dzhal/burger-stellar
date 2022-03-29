import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/burger-icon";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/list-icon";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/profile-icon";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";
import styles from "./app-header.module.css";

function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <nav className={styles.nav}>
                    <div className={styles.navMenu}>
                        <div
                            className={`${styles.navMenuItem} pl-5 pr-5 pb-4 pt-4`}
                        >
                            <div className={styles.navIcon}>
                                <BurgerIcon type="primary" />
                            </div>
                            <span
                                className={`${styles.navTetxt} text text_type_main-default ml-2`}
                            >
                                Конструктор
                            </span>
                        </div>
                        <div
                            className={`${styles.navMenuItem} pl-5 pr-5 pb-4 pt-4 ml-2`}
                        >
                            <div className={styles.navIcon}>
                                <ListIcon type="secondary" />
                            </div>
                            <span
                                className={`${styles.navTetxt} text_color_inactive text text_type_main-default ml-2`}
                            >
                                Лента заказов
                            </span>
                        </div>
                    </div>
                    <div
                        className={`${styles.navMenuItem} pl-5 pr-5 pb-4 pt-4`}
                    >
                        <div className={styles.navIcon}>
                            <ProfileIcon type="secondary" />
                        </div>
                        <span
                            className={`${styles.navTetxt} text_color_inactive text text_type_main-default ml-2`}
                        >
                            Личный кабинет
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;
