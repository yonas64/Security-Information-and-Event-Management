export type Review = {
  id: string;
  rating: number; // 1-5
  title?: string;
  body?: string;
  createdAt: string;
};

export function averageRating(reviews: Review[]): number {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  return sum / reviews.length;
}

export type Sentiment = 'positive' | 'neutral' | 'negative';

export function filterBySentiment(reviews: Review[], sentiment: Sentiment): Review[] {
  if (!reviews) return [];
  return reviews.filter((r) => {
    if (sentiment === 'positive') return r.rating >= 4;
    if (sentiment === 'neutral') return r.rating === 3;
    return r.rating <= 2;
  });
}
