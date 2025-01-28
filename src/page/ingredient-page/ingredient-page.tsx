import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIngredientsState } from "../../services/ingredients/slice.ts";
import { Ingredient } from "../../utils/types.ts";
import { IngredientDetails } from "../../components/burger-ingredients/ingredient-details/ingredient-details.tsx";
import { Modal } from "../../components/modal/modal.tsx";

export const IngredientPage: React.FC<IngredientPageProps> = ({isModal}) => {
  const { ingredientId } = useParams();
  const { ingredients } = useSelector(getIngredientsState);
  const [ingredient, setIngredient] = useState<Ingredient | undefined>()
  const navigate = useNavigate();

  useEffect(() => {
    const ingredientCurrent = ingredients.find(item=> item._id === ingredientId)
    setIngredient(ingredientCurrent)
  }, [ingredients, ingredientId]);

  const handleClose = () => {
    navigate(-1);
  };

  if (isModal && ingredient) {
    return (
      <Modal title="Детали ингредиента" onClose={handleClose}>
        <IngredientDetails item={ingredient} />
      </Modal>
    );
  }

  return (
    <>
      {ingredient ? (
        <div className="container">
          <h1 className="text text_type_main-large text_align-center mt-30">Детали ингредиента</h1>
          <IngredientDetails item={ingredient}/>
        </div>
      ) : (
        <div className="container mb-10 mt-10 ">
          <p className="text">Такого ингредиента нет</p>
        </div>
      )}
    </>
  )
}

interface IngredientPageProps {
  isModal?: boolean;
}
