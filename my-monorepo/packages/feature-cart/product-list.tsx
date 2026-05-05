'use client';

import { useState } from 'react';
import { Card, Button, ProductCard } from 'ui-components';
import { addToCart, formatPrice } from 'utils';

const products = [
  { id: 1, name: 'Sneaker', price: 79.99 },
  { id: 2, name: 'Backpack', price: 49.99 },
  { id: 3, name: 'Hat', price: 19.99 },
];

export const ProductListFeature = () => {
  const [cart, setCart] = useState<any[]>([]);

  return (
    <Card>
      <h2>Product Catalog</h2>
      <div>
        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: 12 }}>
            <ProductCard name={product.name} price={product.price} />
            <Button onClick={() => setCart(addToCart(cart, product))}>Add to Cart</Button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>Cart items: {cart.length}</div>
      <div>Total: {formatPrice(cart.reduce((sum, item) => sum + item.price, 0))}</div>
    </Card>
  );
};
