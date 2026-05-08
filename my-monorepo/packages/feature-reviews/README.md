# feature-reviews

Product reviews and ratings feature package.

Exports:
- `Rating` component — star display
- `ReviewForm` component — simple form to capture reviews
- `ReviewList` component — list and average
- utility functions `averageRating`, `filterBySentiment`

Usage:

Import from the package root and wire into product pages. This package intentionally provides UI-only components and simple utilities; integrate with your backend or state layer as needed.

Example:

```tsx
import { Rating, ReviewForm, ReviewList } from 'feature-reviews';

// use within product page
```
