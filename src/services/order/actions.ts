import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOrderRequest } from "../../utils/api.ts";

export const postOrderThunk = createAsyncThunk (
  "order/postOrder",
  async (data:string[]) => {
    return await postOrderRequest(data);
  }
)