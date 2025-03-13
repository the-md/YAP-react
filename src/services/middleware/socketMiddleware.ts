import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { wsConnect as wsOrderConnect, wsDisconnect as wsOrderDisconnect } from "../order-feed/actions";
import { wsConnect as wsProfileConnect, wsDisconnect as wsProfileDisconnect } from "../profile-order/actions";
import {
  wsClose as wsOrderClose,
  wsConnecting as wsOrderConnecting,
  wsError as wsOrderError,
  wsMessage as wsOrderMessage,
  wsOpen as wsOrderOpen
} from "../order-feed/slice.ts";
import {
  wsClose as wsProfileClose,
  wsConnecting as wsProfileConnecting,
  wsError as wsProfileError,
  wsMessage as wsProfileMessage,
  wsOpen as wsProfileOpen
} from "../profile-order/slice.ts";
import { refreshTokenRequest } from "../../utils/api.ts";

export type TWsActionTypes<R, S> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
  sendMessage?: ActionCreatorWithPayload<S>;
}

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
  wsActions: TWsActionTypes<R, S>,
  withTokenRefresh: boolean = false
): Middleware<Record<string, never>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      onConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
      sendMessage
    } = wsActions;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;

      if (connect.match(action)) {
        url = action.payload;
        socket = new WebSocket(action.payload);
        if (onConnecting) {
          dispatch(onConnecting());
        }
        isConnected = true;

        socket.onopen = () => {
          if (onOpen) {
            dispatch(onOpen());
          }
        };

        socket.onerror = () => {
          dispatch(onError("Error"));
        };

        socket.onmessage = (event) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);

            if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
              refreshTokenRequest()
                .then(refreshData => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    "token",
                    refreshData.accessToken
                  );
                  dispatch(connect(wssUrl.toString()));
                })
                .catch(err => {
                  dispatch(onError((err as Error).message));
                });

              dispatch(disconnect());

              return;
            }

            dispatch(onMessage(parsedData));
          } catch (err) {
            dispatch(onError((err as Error).message));
          }
        };

        socket.onclose = () => {
          if (onClose) {
            dispatch(onClose());
          }

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };
      }

      if (socket && sendMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (err) {
          dispatch(onError((err as Error).message));
        }
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        socket = null;
      }

      next(action);
    }
  }
}

export const orderFeedMiddleware = socketMiddleware({
  connect: wsOrderConnect,
  disconnect: wsOrderDisconnect,
  onConnecting: wsOrderConnecting,
  onOpen: wsOrderOpen,
  onClose: wsOrderClose,
  onError: wsOrderError,
  onMessage: wsOrderMessage
});

export const profileOrderMiddleware = socketMiddleware({
  connect: wsProfileConnect,
  disconnect: wsProfileDisconnect,
  onConnecting: wsProfileConnecting,
  onOpen: wsProfileOpen,
  onClose: wsProfileClose,
  onError: wsProfileError,
  onMessage: wsProfileMessage
}, true);