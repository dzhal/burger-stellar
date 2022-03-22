import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {
  return (
    <>
      <AppHeader />
      <main className={`${style.container}`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
      
    </>
  );
}

export default App;
