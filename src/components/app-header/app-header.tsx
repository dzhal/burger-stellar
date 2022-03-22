
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/burger-icon';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/list-icon';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/profile-icon';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';
import AppHeaderStyles from './app-header.module.css'

function AppHeader() {
    return (
        <header className={AppHeaderStyles.header} >
            <div className={AppHeaderStyles.container} >
                <div className={AppHeaderStyles.logo}>
                    <Logo />
                </div>
                <nav className={AppHeaderStyles.nav}>
                    <div className={AppHeaderStyles.navMenu}>
                        <div className={`${AppHeaderStyles.navMenuItem} pl-5 pr-5 pb-4 pt-4`}>
                            <div className={AppHeaderStyles.navIcon}>
                                <BurgerIcon type="primary" />
                            </div>
                            <span className={`${AppHeaderStyles.navTetxt} text text_type_main-default ml-2`}>
                                Конструктор
                            </span>
                        </div >
                        <div className={`${AppHeaderStyles.navMenuItem} pl-5 pr-5 pb-4 pt-4 ml-2`}>
                            <div className={AppHeaderStyles.navIcon}>
                                <ListIcon type="secondary" />
                            </div>
                            <span className={`${AppHeaderStyles.navTetxt} text_color_inactive text text_type_main-default ml-2`}>
                                Лента заказов
                            </span>
                        </div>
                    </div>
                    <div className={`${AppHeaderStyles.navMenuItem} pl-5 pr-5 pb-4 pt-4`}>
                        <div className={AppHeaderStyles.navIcon}>
                            <ProfileIcon type="secondary" />
                        </div>
                        <span className={`${AppHeaderStyles.navTetxt} text_color_inactive text text_type_main-default ml-2`}>
                            Личный кабинет
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader;