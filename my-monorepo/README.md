📦 Monorepo E-commerce Project

A simple monorepo-based e-commerce system built using Turborepo, featuring reusable UI components, utility functions, and two core features: Authentication and Product Search.

🧱 Project Structure
my-monorepo/
│
├── apps/
│   └── web/                # Main frontend application (Next.js or React)
│
├── packages/
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── product-card.tsx
│   │
│   ├── utils/             # Shared utility functions
│   │   ├── cart.ts
│   │   ├── search.ts
│   │   ├── total.ts
│   │   └── formatPrice.ts
│   │
│   ├── feature-x/        # Authentication feature
│   │   └── auth.tsx
            search.tsx
│   │
│
│
├── turbo.json             # Turborepo configuration
├── package.json           # Root workspace config
└── README.md
⚙️ Tech Stack
Monorepo Tool: Turborepo
Frontend: React / Next.js
Language: TypeScript
Styling: Inline styles (can be upgraded to Tailwind)
Architecture: Component-based + reusable packages
🚀 Features
🔐 Authentication (feature-x)
Login form
Register form toggle
Uses shared UI components (Input, Button, Card)
🔍 Product Search (feature-y)
Search products by name
Real-time filtering
Uses shared utility functions
🧩 Shared Packages
ui → reusable UI components
utils → shared business logic (search, cart, formatting)
📥 Installation
1. Clone the repository
git clone <your-repo-url>
cd my-monorepo
2. Install dependencies
npm install

Turborepo will automatically link all workspace packages.

▶️ Running the Project
Start development server
npm run dev

This will run the main app in apps/web.

🏗️ Build Project

To build all packages:

npm run build

Turborepo will:

Build shared packages first
Then build the web application
📦 How Packages Work Together
Example usage:
import { Button, Input } from 'ui';
import { searchProducts } from 'utils';
import { Auth } from 'feature-x';
import { SearchFeature } from 'feature-y';

Each feature is composed using shared UI and utility packages, demonstrating reusability and modular architecture.

🧠 Key Learning Outcomes

This project demonstrates:

Monorepo architecture using Turborepo
Code reusability across packages
Separation of concerns
Scalable frontend architecture
Component-driven development
📌 Notes
This project is intentionally simple for educational purposes.
No backend or database is required.
Authentication is UI-based (mock logic).
Can be extended into a full MERN system.
👨‍💻 Author

Built as part of a Monorepo System Development Assignment
Focused on modular design, reusable components, and clean architecture.

🚀 Optional Improvements (Bonus Ideas)
Add Tailwind CSS styling
Add real backend authentication (JWT)
Add product database (MongoDB)
Add cart system feature
Add API layer inside utils