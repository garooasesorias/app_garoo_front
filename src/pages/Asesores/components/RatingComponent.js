import { Rating } from "flowbite-react";

export default function RatingComponent({
  ratingSkillId,
  rating,
  onRatingSkillChange,
}) {
  const handleStarClick = (newRating) => {
    if (onRatingSkillChange) {
      onRatingSkillChange(ratingSkillId, newRating);
    }
  };
  // Crea un arreglo de estrellas basado en el rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Rating.Star
      key={index}
      filled={index < rating}
      onClick={() => handleStarClick(index + 1)} // Actualiza el rating al hacer clic
    />
  ));

  return <Rating>{stars}</Rating>;
}
