import React, { useState } from 'react';
import { Review } from './ratings';

type Props = {
  onSubmit: (review: Review) => void;
  initial?: Partial<Review>;
};

const ReviewForm: React.FC<Props> = ({ onSubmit, initial }) => {
  const [rating, setRating] = useState<number>(initial?.rating ?? 5);
  const [title, setTitle] = useState<string>(initial?.title ?? '');
  const [body, setBody] = useState<string>(initial?.body ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: Date.now().toString(), rating, title, body, createdAt: new Date().toISOString() });
    setTitle('');
    setBody('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Write a review">
      <div style={{ marginBottom: 8 }}>
        <label>
          Rating
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={{ marginLeft: 8 }}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ marginLeft: 8 }} />
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Review
          <textarea value={body} onChange={(e) => setBody(e.target.value)} style={{ marginLeft: 8, width: '100%' }} />
        </label>
      </div>

      <button type="submit">Submit review</button>
    </form>
  );
};

export default ReviewForm;
