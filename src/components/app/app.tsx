import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useEffect, useState } from "react";
import { URL } from "../../utils/fetch-url";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import Loader from "../loader/loader";
import FetchError from "../fetch-error/fetch-error";

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [selectedID, setSelectedID] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetch(URL)
            .then((data) => data.json())
            .then((json) => {
                setIsLoading(false);
                setData(json.data);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(true);
                console.log(`${e.name}: ${e.message}`);
            });
    }, []);

    const handleRetry = () => {
        setIsLoading(true);
        fetch(URL)
            .then((data) => data.json())
            .then((json) => {
                setIsLoading(false);
                setData(json.data);
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
                children={<OrderDetails />}
            />
            <main className={`${style.container}`}>
                {isLoading ? (
                    <Loader />
                ) : isError ? (
                    <FetchError handleRetry={handleRetry} />
                ) : (
                    <>
                        <BurgerIngredients
                            data={data}
                            openDetails={openDetails}
                        />
                        <BurgerConstructor
                            data={data}
                            openOrderSuccess={openOrderSuccess}
                        />
                    </>
                )}
            </main>
        </>
    );
}

export default App;
