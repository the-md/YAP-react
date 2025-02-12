import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsState } from "../../services/ingredients/slice.ts";
import { Ingredient } from "../../utils/types.ts";
import { IngredientDetails } from "../../components/burger-ingredients/ingredient-details/ingredient-details.tsx";
import { Modal } from "../../components/modal/modal.tsx";
import type { AppDispatch } from "../../services/store.ts";
import { loadIngredients } from "../../services/ingredients/actions.ts";
import { Loading } from "../../components/loading/loading.tsx";

export const IngredientPage: React.FC<IngredientPageProps> = ({ isModal }) => {
  const { ingredientId } = useParams();
  const { ingredients, loading } = useSelector(getIngredientsState);
  const dispatch = useDispatch<AppDispatch>();
  const [ingredient, setIngredient] = useState<Ingredient | undefined>()
  const navigate = useNavigate();

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(loadIngredients());
    }
  }, [dispatch, ingredients]);

  useEffect(() => {
    const ingredientCurrent = ingredients.find(item=> item._id === ingredientId)
    setIngredient(ingredientCurrent)
  }, [ingredients, ingredientId]);

  const handleClose = () => {
    navigate(-1);
  };

  if (loading) return (
    <Loading container={!isModal}/>
  );

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
          <IngredientDetails item={ingredient} />
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
