import { Ingredient, MessageResponseProps, OrderResponseProps, User } from "./types.ts";

export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';
export const BURGER_API_WSS = `wss://norma.nomoreparties.space`;
const apiConfig = {
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
}

const getResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json()
}

const isTokenExpired = (token: string): boolean => {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch (error) {
    console.error("Ошибка при проверке токена:", error);
    return false;
  }
};

const checkAndRefreshToken = async (): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return;
  }

  if (isTokenExpired(accessToken)) {
    const refreshData = await refreshTokenRequest()
    if(!refreshData.success) {
      Promise.reject(refreshData)
    }
    localStorage.setItem("refreshToken", refreshData.refreshToken)
    localStorage.setItem('accessToken', refreshData.accessToken.split('Bearer ')[1]);
  }
};

export const refreshTokenRequest = async (): Promise<AuthTokenResponseProps> => {
  const res = await fetch(`${BURGER_API_URL}/auth/token`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken")
    })
  });
  return await getResponse<AuthTokenResponseProps>(res);
};

export const getIngredientsRequest = async (): Promise<IngredientsProps> => {
  const res = await fetch(`${BURGER_API_URL}/ingredients`, {
    headers: apiConfig.headers,
  });
  return await getResponse<IngredientsProps>(res);
};

export const orderRequest = async (order: Array<string>): Promise<OrderResponseProps> => {
  await checkAndRefreshToken();
  const res = await fetch(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    headers: {
      ...apiConfig.headers,
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      ingredients: order
    })
  });
  return await getResponse<OrderResponseProps>(res);
};

export const getOrdersRequest = async (orderId: number): Promise<OrderResponseProps> => {
  const res = await fetch(`${BURGER_API_URL}/orders/${orderId}`, {
    headers: apiConfig.headers,
  });
  return await getResponse<OrderResponseProps>(res);
};

export const forgotPasswordRequest = async (data: Pick<User, 'email'>): Promise<MessageResponseProps> => {
  const res = await fetch(`${BURGER_API_URL}/password-reset`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse<MessageResponseProps>(res);
};

export const resetPasswordRequest = async (data: ResetPasswordRequestProps): Promise<MessageResponseProps> => {
  const res = await fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse<MessageResponseProps>(res);
};

export const registerRequest = async (data: User): Promise<AuthResponseProps> => {
  const res = await fetch(`${BURGER_API_URL}/auth/register`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse<AuthResponseProps>(res);
};

export const loginRequest = async (data: Omit<User, 'name'>): Promise<AuthResponseProps> => {
  const res = await fetch(`${BURGER_API_URL}/auth/login`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse<AuthResponseProps>(res);
};

export const logoutRequest = async (data: TokenRequestProps): Promise<MessageResponseProps> => {
  const res = await fetch(`${BURGER_API_URL}/auth/logout`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse<MessageResponseProps>(res);
};

export const getUserRequest = async (): Promise<UserResponseProps> => {
  await checkAndRefreshToken();
  const res = await fetch(`${BURGER_API_URL}/auth/user`, {
    headers: {
      ...apiConfig.headers,
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return await getResponse<UserResponseProps>(res);
};

export const updateUserRequest = async (user: Partial<User>): Promise<UserResponseProps> => {
  await checkAndRefreshToken();
  const res = await fetch(`${BURGER_API_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      ...apiConfig.headers,
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(user)
  });
  return await getResponse<UserResponseProps>(res);
};

interface IngredientsProps {
  success: boolean,
  data: Array<Ingredient>;
}
interface AuthTokenResponseProps {
  success: boolean,
  accessToken: string,
  refreshToken: string,
}
interface UserResponseProps {
  success: boolean,
  user: Omit<User, 'password'>
}
interface TokenRequestProps {
  token: string
}
interface ResetPasswordRequestProps {
  password: string,
  token: string
}
export interface AuthResponseProps {
  success: boolean,
  accessToken: string,
  refreshToken: string,
  user: Omit<User, 'password'>
}