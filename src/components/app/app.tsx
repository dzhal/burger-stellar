//libs
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
//components
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Loader from "../loader/loader";
import FetchError from "../fetch-error/fetch-error";
import Login from "../../pages/login";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Register from "../../pages/register";
import Profile from "../../pages/profile";
import Page404 from "../../pages/page-404";
import IngredientPage from "../../pages/ingredient-page";
import EditUser from "../../pages/edit-user";
import OrderSuccess from "../order-success/order-success";
import OrdersFeed from "../orders-feed/orders-feed";
import UserOrders from "../../pages/user-orders";
//helpers
import { useAppSelector, useAppDispatch } from "../../services/app-hooks";
import { getIngredients } from "../../services/burger-ingredients-slice";
import { closeDetailsModal, closeOrderModal } from "../../services/modal-slice";
import { getToken } from "../../utils/cookie-utils";
import { refreshingToken, setLoggedIn } from "../../services/auth-slice";
//styles
import style from "./app.module.css";
import OrderDetails from "../order-detailed/order-details";

type LocationProps = {
  state: {
    from?: { pathname: string };
    backgroundLocation?: Location;
  };
};

function App() {
  const location = useLocation() as LocationProps;
  let state = location.state;
  let from = state?.from || "/";
  const navigate = useNavigate();
  const token = getToken("token");
  const dispatch = useAppDispatch();
  const { isLoading, hasError } = useAppSelector(
    (store) => store.burgerIngredients
  );
  const { isDetailsOpen, isSuccessOpen } = useAppSelector(
    (store) => store.modal
  );
  const { isLoggedIn, canResetPassword } = useAppSelector(
    (state) => state.auth
  );
  useEffect(() => {
    dispatch(getIngredients());
    if (token) {
      dispatch(setLoggedIn());
      dispatch(refreshingToken(token));
    }
  }, [dispatch]);

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
        children={<OrderSuccess />}
      />
      <Routes location={state?.backgroundLocation || location}>
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
        <Route path="feed" element={<OrdersFeed />} />
        <Route path="feed/:id" element={<OrderDetails />} />
        <Route path="profile/orders/:id" element={<OrderDetails />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to={from} replace />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to={from} replace />}
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
          element={
            isLoggedIn ? (
              <Profile />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        >
          <Route path="" element={<EditUser />} />
          <Route path="orders" element={<UserOrders />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                title="Детали ингредиента"
                isModalOpen={isDetailsOpen}
                onClose={closeDetailsModalHandler}
                children={<IngredientDetails />}
              />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default React.memo(App);
