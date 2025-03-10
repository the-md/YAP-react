import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "PROFILE_ORDER_CONNECT">("PROFILE_ORDER_CONNECT");
export const wsDisconnect = createAction("PROFILE_ORDER_DISCONNECT");

export type TWsExternalActions = ReturnType<typeof wsConnect> | ReturnType<typeof wsDisconnect>;