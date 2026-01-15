import { useState } from "react";

export default function useIngredients() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient));
  };

  const addCustomIngredient = (ingredient: string) => {
    const trimmedIngredient = ingredient.trim();
    if (trimmedIngredient && !selectedIngredients.includes(trimmedIngredient)) {
      setSelectedIngredients([...selectedIngredients, trimmedIngredient]);
    }
  };

  const addMultipleCustomIngredients = (ingredients: string[]) => {
    const newIngredients = ingredients
      .map((ing) => ing.trim())
      .filter((ing) => ing && !selectedIngredients.includes(ing));

    if (newIngredients.length > 0) {
      setSelectedIngredients([...selectedIngredients, ...newIngredients]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredients();
    }
  };

  const handleAddIngredients = () => {
    if (!inputValue.trim()) return;

    if (inputValue.includes(",")) {
      const ingredients = inputValue.split(",");
      addMultipleCustomIngredients(ingredients);
    } else {
      addCustomIngredient(inputValue);
    }

    setInputValue("");
  };

  const handleRemoveSelectedIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(
        selectedIngredients.filter((i) => i !== ingredient),
      );
    } else {
      removeIngredient(ingredient);
    }
  };

  return {
    selectedIngredients,
    inputValue,
    addIngredient,
    removeIngredient,
    handleInputChange,
    handleKeyDown,
    handleAddIngredients,
    handleRemoveSelectedIngredient,
  };
}
