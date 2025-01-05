import { ReactNode } from "react";

export interface IngredientsArr {
  success: boolean,
  data: IngredientObj[];
}
export interface IngredientObj {
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
export interface IngredientsSectionsProps {
  title: string;
  children: ReactNode
}
export interface IngredientItemProps {
  item: IngredientObj;
  openModal: (item: IngredientObj | null) => void
}

export interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void
}

export interface ModalOverlayProps {
  onClose: () => void
}

export interface IngredientsState {
  ingredients: IngredientObj[];
  loading: boolean;
  error: string | null;
}
export interface BurgerConstructorState {
  constructorIngredients: IngredientObj[];
  bun: IngredientObj;
}