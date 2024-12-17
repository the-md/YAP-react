import { IngredientsArray } from "./ingredients-array.ts";

export interface IngredientsSections {
  title: string;
  type: string;
  ingredients: IngredientsArray[];
}