# Ecommerce Monorepo

This repository is a monorepo for a simple ecommerce project. It demonstrates how shared UI components and utility functions are composed into feature packages.

## Monorepo Structure

- `apps/e-frontend` — ecommerce frontend UI bundle
- `apps/e-Backend` — ecommerce backend service
- `packages/ui-components` — reusable UI components library
- `packages/utils` — shared utility library
- `packages/feature-authentication` — authentication feature package
- `packages/feature-cart` — cart and product feature package

## Feature Package Architecture

### `packages/feature-authentication`

**Functionality:**
- `Auth` component renders a login/register form.
- Supports toggling between login and register modes.
- Displays email and password input fields and a submit button.

**Architecture:**
- Imports shared visual blocks from `ui-components`:
  - `Card` for the form container
  - `Input` for text fields
  - `Button` for form actions
- Maintains local component state for `mode`, `email`, and `password`.
- Demonstrates feature composition by using shared UI components to build a reusable auth feature.

**Composition example:**
```ts
import { Input, Button, Card } from 'ui-components';
```

### `packages/feature-cart`

**Functionality:**
- `ProductListFeature` displays a product catalog and allows adding items to the cart.
- `CartFeature` shows cart items, allows removal, and calculates the cart total.

**Architecture:**
- Uses `ui-components` for presentational layout and controls:
  - `Card` for grouping feature content
  - `Button` for actions
  - `ProductCard` for product display
- Uses `utils` for ecommerce logic:
  - `addToCart` to add items into cart state
  - `removeFromCart` to remove items from cart state
  - `formatPrice` to render prices
  - `calculateTotal` to compute cart totals
- Demonstrates feature composition by combining UI building blocks with shared business logic.

**Composition examples:**
```ts
import { Card, Button, ProductCard } from 'ui-components';
import { addToCart, formatPrice } from 'utils';
```
```ts
import { Card, Button } from 'ui-components';
import { removeFromCart, calculateTotal, formatPrice } from 'utils';
```

## Shared Package Architecture

### `packages/ui-components`

Contains reusable presentational components:
- `Button`
- `Card`
- `Input`
- `ProductCard`

These components are exported from `packages/ui-components/src/index.tsx` and are designed to be used by multiple feature packages.

### `packages/utils`

Contains shared utility functions for ecommerce behavior:
- `searchProducts`
- `addToCart`
- `removeFromCart`
- `formatPrice`
- `calculateTotal`

These functions are pure helpers that can be imported into any feature package.

## Getting Started

Install dependencies at the root:

```bash
cd my-monorepo
npm install
```

Run the ecommerce backend:

```bash
cd apps/e-Backend
npm install
npm run start:dev
```

Preview the ecommerce frontend:

```bash
npx serve apps/e-frontend
```

## Workspace Commands

From the root directory:

```bash
npm run dev
npm run build
npm run lint
npm run format
npm run check-types
```

> Note: `apps/e-Backend` uses `npm run start:dev` from its own directory.

