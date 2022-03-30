//libs
import { useEffect, useState } from "react";
//components
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Loader from "../loader/loader";
import FetchError from "../fetch-error/fetch-error";
//helpers
import { ConstructorDataContext } from "../../services/constructorDataContext";
import { IIngredient } from "../../@type/types";
import { URL_GET_DATA } from "../../utils/fetch-urls";
//styles
import style from "./app.module.css";

function App() {
  const [data, setData] = useState<IIngredient[]>([]);
  const [constructorData, setСonstructorData] = useState<IIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [orderId, setOrderID] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
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
  };
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
    if (orderId) {
      setOrderID(0);
    }
  };

  const detailedInfo = data.find((item) => item["_id"] === selectedID) || null;

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
