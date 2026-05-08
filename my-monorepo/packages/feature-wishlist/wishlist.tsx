'use client';

import React, { useState } from 'react';
import { addToWishlist, removeFromWishlist, isInWishlist, formatPrice } from 'utils';

const products = [
  { id: 1, name: 'Sneaker', price: 79.99 },
  { id: 2, name: 'Backpack', price: 49.99 },
  { id: 3, name: 'Hat', price: 19.99 },
];

export const WishlistFeature = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  const toggle = (product: any) => {
    if (isInWishlist(wishlist, product.id)) {
      setWishlist(removeFromWishlist(wishlist, product.id));
    } else {
      setWishlist(addToWishlist(wishlist, product));
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
      <h2>Wishlist</h2>

      <div>
        <h3>All Products</h3>
        {products.map((product) => (
          <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>{product.name} — {formatPrice(product.price)}</span>
            <button onClick={() => toggle(product)}>
              {isInWishlist(wishlist, product.id) ? '♥ Remove' : '♡ Save'}
            </button>
          </div>
        ))}
      </div>

      {wishlist.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h3>Saved Items ({wishlist.length})</h3>
          {wishlist.map((item) => (
            <div key={item.id} style={{ marginBottom: 6 }}>
              {item.name} — {formatPrice(item.price)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
