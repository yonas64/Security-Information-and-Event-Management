'use client';

import { useState } from 'react';
import { Card, Button } from 'ui-components';
import { calculateTotal, removeFromCart, formatPrice } from 'utils';

export const CartFeature = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Sneaker', price: 79.99 },
    { id: 2, name: 'Backpack', price: 49.99 },
  ]);

  const handleRemove = (index: number) => setCart(removeFromCart(cart, index));

  return (
    <Card>
      <h2>Shopping Cart</h2>
      <div>
        {cart.map((item, index) => (
          <div key={item.id} style={{ marginBottom: 8 }}>
            <span>{item.name} - {formatPrice(item.price)}</span>
            <Button onClick={() => handleRemove(index)}>Remove</Button>
          </div>
        ))}
      </div>
      <strong>Total: {formatPrice(calculateTotal(cart))}</strong>
    </Card>
  );
};
