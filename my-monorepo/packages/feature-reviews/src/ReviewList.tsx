import React from 'react';
import Rating from './Rating';
import { Review, averageRating } from './ratings';

type Props = {
  reviews: Review[];
  showAverage?: boolean;
};

const ReviewList: React.FC<Props> = ({ reviews, showAverage = true }) => {
  return (
    <div>
      {showAverage && (
        <div style={{ marginBottom: 8 }}>
          <strong>Average rating: </strong>
          <span>{averageRating(reviews).toFixed(1)}</span>
        </div>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reviews.map((r) => (
          <li key={r.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Rating value={r.rating} />
              <strong>{r.title}</strong>
              <span style={{ marginLeft: 'auto', color: '#666', fontSize: 12 }}>{new Date(r.createdAt).toLocaleDateString()}</span>
            </div>
            <div style={{ marginTop: 6 }}>{r.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
