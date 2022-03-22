import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';
import { URL } from '../../utils/fetch-url';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';


function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(URL)
      .then(data => data.json())
      .then(json => {
        setIsLoading(false);
        setData(json.data);
      })
      .catch(e => {
        setIsLoading(false);
        setError(true)
      })
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    fetch(URL)
      .then(data => data.json())
      .then(json => {
        setIsLoading(false);
        setData(json.data);
      })
      .catch(e => {
        setIsLoading(false);
        setError(true)
      })
  }

  return (
    <>
      <AppHeader />
      <main className={`${style.container}`}>
        {
          isLoading
            ?
            <div className={`${style.loader} text text_type_main-large`}>
              Загрузка...
            </div> 
            :
            isError 
              ? 
              <div className={`${style.error}`}>
                <div className='text text_type_main-large'>
                  Ошибка при загрузке данных =(
                </div>
                <Button type="primary" size="medium" onClick={handleRetry}>
                  Попробовать еще раз
                </Button>
              </div>
              : 
              <>
                <BurgerIngredients data={data} />
                <BurgerConstructor data={data} />
              </>
        }
      </main>

    </>
  );
}

export default App;
