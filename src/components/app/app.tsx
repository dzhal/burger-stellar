//libs
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
//components
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Loader from "../loader/loader";
import FetchError from "../fetch-error/fetch-error";
import Login from "../../pages/login";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Register from "../../pages/register";
import Profile from "../../pages/profile";
import Page404 from "../../pages/page-404";
import IngredientPage from "../../pages/ingredient-page";
//helpers
import { useAppSelector, useAppDispatch } from "../../services/app-hooks";
import { getIngredients } from "../../services/burger-ingredients-slice";
import { closeDetailsModal, closeOrderModal } from "../../services/modal-slice";
import { getToken } from "../../utils/cookie-utils";
import { setLoggedIn, setRefreshToken } from "../../services/auth-slice";
//styles
import style from "./app.module.css";
import Orders from "../../pages/orders";

function App() {
  const navigate = useNavigate();
  const token = getToken("token");
  const modalDetailed = localStorage.getItem("modalDetailed");
  const dispatch = useAppDispatch();
  const { isLoading, hasError } = useAppSelector(
    (store) => store.burgerIngredients
  );
  const { isSuccessOpen } = useAppSelector((store) => store.modal);
  const { isLoggedIn, canResetPassword } = useAppSelector(
    (state) => state.auth
  );
  useEffect(() => {
    dispatch(getIngredients());
    if (token) {
      dispatch(setLoggedIn());
      dispatch(setRefreshToken(token));
    }
  }, [dispatch, token]);

  const closeDetailsModalHandler = () => {
    dispatch(closeDetailsModal());
    navigate("/");
  };
  const closeOrderModalHandler = () => {
    dispatch(closeOrderModal());
  };

  return (
    <>
      <AppHeader />
      <Modal
        onClose={closeOrderModalHandler}
        isModalOpen={isSuccessOpen}
        children={<OrderDetails />}
      />
      <Routes>
        <Route
          path="/"
          element={
            <main className={`${style.container}`}>
              {isLoading ? (
                <Loader />
              ) : hasError ? (
                <FetchError />
              ) : (
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              )}
            </main>
          }
        />
        <Route
          path="/ingredients/:id"
          element={
            Boolean(modalDetailed) ? (
              <Modal
                title="Детали ингредиента"
                isModalOpen={Boolean(modalDetailed)}
                onClose={closeDetailsModalHandler}
                children={<IngredientDetails />}
              />
            ) : (
              <IngredientPage />
            )
          }
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/forgot-password"
          element={!isLoggedIn ? <ForgotPassword /> : <Navigate to="/" />}
        />
        <Route
          path="/reset-password"
          element={
            canResetPassword ? (
              <ResetPassword />
            ) : (
              <Navigate to="/forgot-password" />
            )
          }
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/orders"
          element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default React.memo(App);
