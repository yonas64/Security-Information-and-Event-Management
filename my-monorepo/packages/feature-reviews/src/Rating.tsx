import React from 'react';

type RatingProps = {
  value: number; // 0-5
  size?: number;
  className?: string;
};

const Star: React.FC<{ filled?: boolean; size?: number }> = ({ filled, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.56L19.6 24 12 19.897 4.4 24l1.9-8.69L.6 9.75l7.732-1.732z" />
  </svg>
);

const Rating: React.FC<RatingProps> = ({ value, size = 16, className }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className={className} aria-label={`Rating: ${value} out of 5`}>
      {stars.map((s) => (
        <span key={s} style={{ display: 'inline-block', marginRight: 4 }}>
          <Star filled={value >= s} size={size} />
        </span>
      ))}
    </div>
  );
};

export default Rating;
