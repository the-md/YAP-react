export interface Ingredient {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
}
export interface ConstructorIngredient extends Ingredient {
  uuid: string;
}
export interface User {
  email: string;
  password: string;
  name: string;
}
export interface OrderResponseProps {
  order: Order;
  success: boolean;
}
export interface MessageResponseProps {
  success: boolean,
  message?: string,
  status?: number
}

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export enum OrderStatus {
  created = "created",
  pending = "pending",
  done = "done"
}
export interface Order {
  ingredients: string[];
  _id: string;
  status: OrderStatus;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}
export interface FeedDataResponse {
  success: true;
  orders: Order[];
  total: number;
  totalToday: number;
}