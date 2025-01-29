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
//todo почему здесь знак вопроса
export interface User {
  email?: string;
  password?: string;
  name?: string;
}