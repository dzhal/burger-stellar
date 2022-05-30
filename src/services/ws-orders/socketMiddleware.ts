import { Middleware, MiddlewareAPI } from "redux";
import { getToken } from "../../utils/cookie-utils";
import { AppDispatch, RootState } from "../store";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: { [key: string]: string }
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const accessToken = getToken("token").split(" ")[1];
      const { type } = action;
      const {
        wsInit,
        wsInitPerson,
        wsClose,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === wsInitPerson) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };
        if (type === wsClose) {
          socket.close();
        }
      }

      next(action);
    };
  };
};
