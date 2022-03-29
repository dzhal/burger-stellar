import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useCallback, useEffect, useState } from "react";
import { URL_GET_DATA } from "../../utils/fetch-urls";
import Loader from "../loader/loader";
import FetchError from "../fetch-error/fetch-error";
import { ConstructorDataContext } from "../../context/constructorDataContext";
import { IIngredient } from "../../@type/types";

function App() {
  const [data, setData] = useState<IIngredient[]>([]);
  const [constructorData, setСonstructorData] = useState<IIngredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState<string>("");
  const [orderId, setOrderID] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    fetch(URL_GET_DATA)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        return Promise.reject(data.status);
      })
      .then((json) => {
        setIsLoading(false);
        setData(json.data);
        setСonstructorData(json.data);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(true);
        console.log(`${e.name}: ${e.message}`);
      });
  }, [URL_GET_DATA]);
  const openDetails: (id: string) => void = (id) => {
    setIsDetailsOpen(true);
    setSelectedID(id);
  };
  const openOrderSuccess = () => {
    setIsSuccessOpen(true);
  };
  const onClose = () => {
    setIsDetailsOpen(false);
    setIsSuccessOpen(false);
  };

  const detailedInfo = data.filter((item) => item["_id"] === selectedID)[0];

  return (
    <>
      <AppHeader />
      <Modal
        isModalOpen={isDetailsOpen}
        onClose={onClose}
        title="Детали ингредиента"
        children={<IngredientDetails detailedInfo={detailedInfo} />}
      />
      <Modal
        isModalOpen={isSuccessOpen}
        onClose={onClose}
        children={<OrderDetails orderId={orderId} />}
      />
      <main className={`${style.container}`}>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <FetchError handleRetry={fetchData} />
        ) : (
          <>
            <BurgerIngredients data={data} openDetails={openDetails} />
            <ConstructorDataContext.Provider
              value={{ constructorData, setСonstructorData }}
            >
              <BurgerConstructor
                openOrderSuccess={openOrderSuccess}
                setOrderID={setOrderID}
              />
            </ConstructorDataContext.Provider>
          </>
        )}
      </main>
    </>
  );
}

export default App;
