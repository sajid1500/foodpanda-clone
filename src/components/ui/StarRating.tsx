import React from "react";

interface StarRatingProps {
  rating: number; // Rating value (e.g., 4.5)
  maxRating?: number; // Maximum rating (default: 5)
  size?: number; // Star size in pixels (default: 20)
  showRating?: boolean; // Show numeric rating (default: true)
  color?: string; // Star color (default: #ffc107)
  singleStar?: boolean; // Show single partially-filled star instead of multiple stars (default: false)
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 20,
  showRating = true,
  color = "#ed7633",
  singleStar = false,
}: StarRatingProps) {
  if (singleStar) {
    // Single star with partial fill
    const fillPercentage = (rating / maxRating) * 100;

    return (
      <div className="flex items-center gap-1">
        <span
          className="relative inline-block"
          style={{ fontSize: `${size}px` }}
        >
          {/* Empty star (background) */}
          <span style={{ color: "#f5a873" }}>★</span>

          {/* Filled star (overlay) */}
          {fillPercentage > 0 && (
            <span
              className="absolute top-0 left-0"
              style={{
                color,
                overflow: "hidden",
                clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
              }}
            >
              ★
            </span>
          )}
        </span>

        {/* Numeric rating */}
        {showRating && (
          <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
        )}
      </div>
    );
  }

  // Multiple stars (original behavior)
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex" style={{ fontSize: `${size}px` }}>
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} style={{ color }}>
            ★
          </span>
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <span className="relative inline-block" style={{ color: "#e0e0e0" }}>
            ★
            <span
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: "50%", color }}
            >
              ★
            </span>
          </span>
        )}

        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} style={{ color: "#e0e0e0" }}>
            ★
          </span>
        ))}
      </div>

      {/* Numeric rating */}
      {showRating && (
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
