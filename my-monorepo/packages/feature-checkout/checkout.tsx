'use client';

import { useState } from 'react';
import { Input } from 'ui-components';
import { calculateTotal, formatPrice, applyDiscount, isValidCoupon } from 'utils';

interface CheckoutProps {
  cart?: { id: number; name: string; price: number }[];
}

const defaultCart = [
  { id: 1, name: 'Sneaker', price: 79.99 },
  { id: 2, name: 'Backpack', price: 49.99 },
];

export const CheckoutFeature = ({ cart = defaultCart }: CheckoutProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [placed, setPlaced] = useState(false);

  const subtotal = calculateTotal(cart);
  const total = appliedCoupon ? applyDiscount(subtotal, appliedCoupon) : subtotal;
  const savings = subtotal - total;

  const handleApplyCoupon = () => {
    if (isValidCoupon(coupon)) {
      setAppliedCoupon(coupon);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const handlePlaceOrder = () => {
    if (!name || !address) return;
    setPlaced(true);
  };

  if (placed) {
    return (
      <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
        <h2>Order Confirmed</h2>
        <p>Thanks, {name}! Your order will be shipped to: {address}</p>
        <p>Total charged: {formatPrice(total)}</p>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
      <h2>Checkout</h2>

      <div style={{ marginBottom: 16 }}>
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span>{item.name}</span>
            <span>{formatPrice(item.price)}</span>
          </div>
        ))}
        {savings > 0 && (
          <div style={{ color: 'green', marginTop: 4 }}>
            Discount: -{formatPrice(savings)}
          </div>
        )}
        <strong>Total: {formatPrice(total)}</strong>
      </div>

      <div style={{ marginBottom: 12 }}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
      </div>
      <div style={{ marginBottom: 12 }}>
        <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Shipping address" />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code (e.g. SAVE10)" />
        <button onClick={handleApplyCoupon}>Apply</button>
      </div>
      {couponError && <div style={{ color: 'red', marginBottom: 8 }}>{couponError}</div>}
      {appliedCoupon && <div style={{ color: 'green', marginBottom: 8 }}>Coupon applied!</div>}

      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};
