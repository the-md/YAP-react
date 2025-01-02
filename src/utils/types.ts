import { ReactNode } from "react";

export interface IngredientsData {
  success: boolean,
  data: IngredientsArray[];
}
export interface IngredientsArray {
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
  item: IngredientsArray;
  openModal: (item: IngredientsArray | null) => void
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
  ingredients: IngredientsArray[];
  loading: boolean;
  error: string | null;
}