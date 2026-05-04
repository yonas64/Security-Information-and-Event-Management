'use client';

import { useState } from 'react';
import { Input, Card } from 'ui';
import { searchProducts } from 'utils';

const products = [
  { id: 1, name: 'Shoes', price: 50 },
  { id: 2, name: 'T-shirt', price: 20 },
  { id: 3, name: 'Hat', price: 15 },
];

export const SearchFeature = () => {
  const [query, setQuery] = useState('');

  const filtered = searchProducts(products, query);

  return (
    <Card>
      <h2>Search Products</h2>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      <div>
        {filtered.map((p) => (
          <p key={p.id}>
            {p.name} - ${p.price}
          </p>
        ))}
      </div>
    </Card>
  );
};