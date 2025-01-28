import { Ingredient, User } from "./types.ts";

const apiConfig = {
  baseUrl: 'https://norma.nomoreparties.space/api',
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

export const fetchWithRefresh = async (url: string, options: RequestInit): Promise<Response> => {
  try {
    const  res = await fetch(url, options)
    return await getResponse(res);
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "jwt expired") {
      const refreshData = await refreshTokenRequest()
      if(!refreshData.success) {
        Promise.reject(refreshData)
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken)
      localStorage.setItem("accessToken", refreshData.accessToken)
      const res = await fetch(url, options)
      return await getResponse(res);
    } else {
      return Promise.reject(err)
    }
  }
};

export const getIngredientsRequest = async (): Promise<IngredientsProps> => {
  const res = await fetch(`${apiConfig.baseUrl}/ingredients`, {
    headers: apiConfig.headers,
  });
  return await getResponse<IngredientsProps>(res);
};

export const orderRequest = async (order: string[]): Promise<OrderResponseProps> => {
  const res = await fetchWithRefresh(`${apiConfig.baseUrl}/orders`, {
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

export const forgotPasswordRequest = async (data: User): Promise<MessageResponseProps> => {
  const res = await fetch(`${apiConfig.baseUrl}/password-reset`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse<MessageResponseProps>(res);
};

export const resetPasswordRequest = async (data: ResetPasswordRequestProps): Promise<MessageResponseProps> => {
  const res = await fetch(`${apiConfig.baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse<MessageResponseProps>(res);
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

export const logoutRequest = async (data: TokenRequestProps): Promise<MessageResponseProps> => {
  const res = await fetch(`${apiConfig.baseUrl}/auth/logout`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return await getResponse<MessageResponseProps>(res);
};

export const refreshTokenRequest = async (): Promise<AuthResponseProps> => {
  const res = await fetch(`${apiConfig.baseUrl}/auth/token`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken")
    })
  });
  return await getResponse<AuthResponseProps>(res);
};

export const getUserRequest = async () => {
  const res = await fetchWithRefresh(`${apiConfig.baseUrl}/auth/user`, {
    headers: {
      ...apiConfig.headers,
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return await getResponse(res);
};

export const updateUserRequest = async (user: User) => {
  const res = await fetchWithRefresh(`${apiConfig.baseUrl}/auth/user`, {
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
  user?: {
    email: string,
    name: string
  }
}
interface TokenRequestProps {
  token: string
}
interface MessageResponseProps {
  success?: boolean,
  message?: string,
  status?: number
}
interface ResetPasswordRequestProps {
  password: string,
  token: string
}