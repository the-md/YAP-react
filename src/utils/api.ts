import { Ingredient, User } from "./types.ts";

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

export const getIngredientsRequest = async (): Promise<IngredientsProps> => {
  const res = await fetch(`${apiConfig.baseUrl}/ingredients`, {
    headers: apiConfig.headers,
  });
  return await getResponse<IngredientsProps>(res);
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

export const forgotPasswordRequest = async (data) => {
  const res = await fetch(`${apiConfig.baseUrl}/password-reset`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse(res);
};

export const resetPasswordRequest = async (data) => {
  const res = await fetch(`${apiConfig.baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse(res);
};

export const registerRequest = async (data: User): Promise<AuthResponseProps> => {
  const res = await fetch(`${apiConfig.baseUrl}/auth/register`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse<AuthResponseProps>(res);
};

export const loginRequest = async (data: User): Promise<AuthResponseProps> => {
  const res = await fetch(`${apiConfig.baseUrl}/auth/login`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse<AuthResponseProps>(res);
};

export const logoutRequest = async () => {
  const res = await fetch(`${apiConfig.baseUrl}/auth/logout`, {
    method: 'POST',
    headers: apiConfig.headers
  });
  return await getResponse(res);
};

export const tokenRequest = async (data) => {
  const res = await fetch(`${apiConfig.baseUrl}/auth/token`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse(res);
};

export const getUserRequest = async () => {
  const res = await fetch(`${apiConfig.baseUrl}/auth/user`, {
    headers: apiConfig.headers,
  });
  return await getResponse(res);
};

export const updateUserRequest = async (user: User) => {
  const res = await fetch(`${apiConfig.baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(user)
  });
  return await getResponse(res);
};

interface OrderResponseProps {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}
interface IngredientsProps {
  success: boolean,
  data: Ingredient[];
}
interface AuthResponseProps {
  success: boolean,
  accessToken: string,
  refreshToken: string,
  user: {
    email: string,
    name: string  }
}