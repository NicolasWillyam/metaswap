# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

## Code Structure

This structure follows Clean Architecture + Feature-Based Architecture + SOLID principles

```
src/
├─ app/                               # Application entry & routing layer
│  ├─ App.tsx                         # Root app component (providers, router outlet, etc.)
│  ├─ routes.tsx                      # App routing configuration
│  └─ pages/                          # Page-level containers (mapped to routes)
│     ├─ ConnectPage.tsx
│     ├─ HomePage.tsx
│     ├─ SwapPage.tsx
│     └─ WalletPage.tsx
│
├─ core/                              # Domain Layer (pure business logic, no React)
│  ├─ entities/                       # Domain models / entities
│  │  ├─ Token.ts
│  │  └─ Swap.ts
│  ├─ errors/                         # Domain-specific errors
│  │  └─ InvalidTokenError.ts
│  ├─ repositories/                   # Repository interfaces (contracts)
│  │  └─ ITokenRepository.ts
│  └─ usecases/                       # Use cases = application logic
│     ├─ calculateSwap.ts
│     └─ getTokenPrice.ts
│
├─ data/                              # Infrastructure Layer (implements repositories)
│  ├─ repositories/                   # Concrete repository implementations
│  │  └─ TokenRepositoryImpl.ts
│  ├─ sources/                        # Data sources (local/remote)
│  │  ├─ local/
│  │  │  └─ prices.json
│  │  └─ remote/
│  │     └─ pricesAPI.ts
│  └─ mappers/                        # Data ↔ Domain mapping utilities
│     └─ token.mapper.ts
│
├─ features/                          # Feature Modules (each with its own logic & UI)
│  ├─ swap/                           # "Swap" feature
│  │  ├─ components/                  # UI components specific to swap
│  │  │  ├─ SwapFromCard.tsx
│  │  │  ├─ SwapToCard.tsx
│  │  │  ├─ SwapButton.tsx
│  │  │  ├─ SwapDrawer.tsx
│  │  │  ├─ SwapHeader.tsx
│  │  │  └─ SwapInfo.tsx
│  │  ├─ hooks/                       # React hooks specific to swap feature
│  │  │  └─ useSwap.ts
│  │  ├─ slices/                      # Redux slices for swap state
│  │  │  └─ swapSlice.ts
│  │  ├─ services/                    # Application service (calls usecases, repositories)
│  │  │  └─ swap.service.ts
│  │  ├─ validations.ts               # Input validations (Zod/Yup/etc.)
│  │  ├─ types.ts                     # Feature-specific types/interfaces
│  │  └─ index.ts                     # Public API of the feature (for exports)
│  │
│  ├─ token/                          # "Token" feature (similar pattern)
│  │  ├─ components/
│  │  │  ├─ TokenList.tsx
│  │  │  ├─ TokenItem.tsx
│  │  │  ├─ TokenSelectDrawer.tsx
│  │  │  └─ TokenStats.tsx
│  │  ├─ hooks/
│  │  │  └─ useToken.ts
│  │  ├─ slices/
│  │  │  └─ tokenSlice.ts
│  │  ├─ types.ts
│  │  └─ index.ts
│  │
│  ├─ wallet/                         # "Wallet" feature
│  │  ├─ components/
│  │  │  └─ WalletOverview.tsx
│  │  ├─ hooks/
│  │  │  └─ useWallet.ts
│  │  ├─ slices/
│  │  │  └─ walletSlice.ts
│  │  └─ index.ts
│  │
│  └─ buy/receive/send/               # Future features (same structure)
│
├─ shared/                            # Shared UI + utilities used across features
│  ├─ components/                     # Reusable presentation components
│  │  ├─ layout/                      # App-wide layouts
│  │  │  ├─ RootLayout.tsx
│  │  │  └─ RootHeader.tsx
│  │  ├─ ui/                          # UI primitives (from shadcn/ui + custom)
│  │  │  ├─ alert-dialog.tsx
│  │  │  ├─ button.tsx
│  │  │  ├─ dialog.tsx
│  │  │  ├─ select.tsx
│  │  │  ├─ sheet.tsx
│  │  │  └─ ...
│  │  ├─ Background.tsx
│  │  └─ ThemeProvider.tsx
│  │
│  ├─ constants/                      # Global constants (networks, tokens, etc.)
│  │  ├─ networks.ts
│  │  ├─ tokens.ts
│  │  └─ wallet.ts
│  │
│  ├─ helpers/                        # Generic helper functions
│  │  └─ token.helpers.ts
│  │
│  ├─ hooks/                          # Global reusable hooks
│  │  └─ useAuth.ts
│  │
│  ├─ lib/                            # Utility libraries (e.g. clipboard, math, etc.)
│  │  ├─ clipboard.ts
│  │  └─ utils.ts
│  │
│  ├─ store/                          # Global Redux store configuration
│  │  ├─ index.ts                     # Root store setup
│  │  ├─ authSlice.ts
│  │  ├─ networkSlice.ts
│  │  └─ ...
│  │
│  ├─ utils/                          # General-purpose utility functions
│  │  ├─ debounce.ts
│  │  ├─ formatCurrency.ts
│  │  └─ math.ts
│  │
│  └─ styles/                         # Global styles
│     └─ index.css
│
└─ main.tsx                           # Application bootstrap (ReactDOM.render / createRoot)
```

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
