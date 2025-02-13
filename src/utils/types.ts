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
//todo возможно стоит убрать ? и использовать Omit<Type, Keys> или Pick<Type, Keys>
export interface User {
  email?: string;
  password?: string;
  name?: string;
}

export interface OrderResponseProps {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export interface MessageResponseProps {
  success?: boolean,
  message?: string,
  status?: number
}
