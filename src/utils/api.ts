import { IngredientsArr } from "./types.ts";

const apiConfig = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    "Content-Type": "application/json",
  }
}

const getResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json()
}

export const getIngredientsRequest = async (): Promise<IngredientsArr> => {
  const res = await fetch(`${apiConfig.baseUrl}/ingredients`, {
    headers: apiConfig.headers,
  });
  return await getResponse<IngredientsArr>(res);
};

export const postOrderRequest = async (order: string[]): Promise<OrderResponseProps> => {
  const res = await fetch(`${apiConfig.baseUrl}/orders`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      ingredients: order
    })
  });
  return await getResponse<OrderResponseProps>(res);
};


interface OrderResponseProps {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}