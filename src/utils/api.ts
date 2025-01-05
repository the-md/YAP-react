import { IngredientsArr } from "./types.ts";

const apiConfig = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    "Content-Type": "application/json",
  }
}

const getResponse = (res: Response): Promise<IngredientsArr> => {
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json()
}

export const getIngredientsRequest = async (): Promise<IngredientsArr> => {
  const res = await fetch(`${apiConfig.baseUrl}/ingredients`, {
    headers: apiConfig.headers,
  });
  return await getResponse(res);
};