import React from "react";

function NutritionModal({ item, onClose }) {
  if (!item) return null;

  const nutrition = item.nutrition;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />

      <section className="nutrition-modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <p className="eyebrow">Nutrition Facts</p>
        <h2>{item.name}</h2>

        {!nutrition ? (
          <p>Nutrition facts coming soon.</p>
        ) : (
          <div className="nutrition-list">
            {nutrition.servingSize && (
              <p>
                <strong>Serving Size:</strong> {nutrition.servingSize}
              </p>
            )}

            {nutrition.calories !== undefined && (
              <p>
                <strong>Calories:</strong> {nutrition.calories}
              </p>
            )}

            {nutrition.caffeineMg !== undefined && (
              <p>
                <strong>Caffeine:</strong> {nutrition.caffeineMg}mg
              </p>
            )}

            {nutrition.totalFatG !== undefined && (
              <p>
                <strong>Total Fat:</strong> {nutrition.totalFatG}g
              </p>
            )}

            {nutrition.saturatedFatG !== undefined && (
              <p>
                <strong>Saturated Fat:</strong> {nutrition.saturatedFatG}g
              </p>
            )}

            {nutrition.sodiumMg !== undefined && (
              <p>
                <strong>Sodium:</strong> {nutrition.sodiumMg}mg
              </p>
            )}

            {nutrition.totalCarbsG !== undefined && (
              <p>
                <strong>Total Carbs:</strong> {nutrition.totalCarbsG}g
              </p>
            )}

            {nutrition.proteinG !== undefined && (
              <p>
                <strong>Protein:</strong> {nutrition.proteinG}g
              </p>
            )}

            {nutrition.notes?.length > 0 && (
              <div className="nutrition-notes">
                <strong>Breakdown:</strong>
                <ul>
                  {nutrition.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="ingredient-block">
          <strong>Ingredients:</strong>
          <p>{item.ingredients?.join(", ")}</p>
        </div>
      </section>
    </>
  );
}

export default NutritionModal;