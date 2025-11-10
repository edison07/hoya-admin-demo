# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (runs TypeScript check first)
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Code Architecture

### Dual UI Framework Setup

This project uses **both Chakra UI and Tailwind CSS**:
- **Chakra UI**: Primary component library for complex UI components (forms, buttons, modals)
- **Tailwind CSS**: Utility-first CSS for custom styling and animations (e.g., Loading component)
- ChakraProvider has `resetCSS={false}` to preserve Tailwind styles

When creating new components, prefer Chakra UI for standard components. Use Tailwind for animations, utilities, or when Chakra doesn't fit.

### Path Aliases

The project uses `@/` as an alias for the `src/` directory (configured in vite.config.ts):
```typescript
import { authService } from "@/services/auth.service"
import { LoginRequest } from "@/types/auth"
```

### Authentication Flow

Authentication is token-based with localStorage:

1. **Login Flow**: User submits credentials → `useLogin` hook → `authService.login()` → Axios → MSW (dev) / Real API (prod) → Store token in localStorage → Navigate to original page
2. **Route Protection**: `ProtectedRoute` component checks `authService.isAuthenticated()` → If no token, redirect to `/login` with original location in state
3. **Post-Login Redirect**: `useLogin` reads `location.state.from` to redirect user back to their original destination
4. **Logout**: Remove token from localStorage → Navigate to `/login`

The token is automatically attached to all Axios requests via an interceptor in `src/lib/axios.ts`. 401 responses automatically trigger logout and redirect to login page.

### Data Fetching Pattern

This project uses **React Query (TanStack Query)** for server state management, not useState/useEffect:

```typescript
// ✅ Correct: Use React Query mutation for API calls
const loginMutation = useMutation({
  mutationFn: (credentials) => authService.login(credentials),
  onSuccess: (data) => { /* handle success */ }
})

// ❌ Incorrect: Don't use raw fetch/axios with useState
```

All API calls should go through:
1. **Types** (`src/types/*.ts`) - Define request/response types
2. **Service** (`src/services/*.service.ts`) - API client methods using Axios
3. **Hook** (`src/hooks/*.ts`) - React Query wrapper (useMutation/useQuery)
4. **Component** - Call the hook

### Form Validation

Forms use **Yup** for schema validation, not HTML5 validation:

```typescript
// Define schema in src/schemas/
export const loginSchema = yup.object({
  username: yup.string().required().min(3).max(20),
  password: yup.string().required().min(8)
})

// Validate in component
const handleBlur = async (field: string) => {
  try {
    await loginSchema.validateAt(field, { [field]: value })
  } catch (err) {
    // Handle validation error
  }
}
```

Forms should validate both `onBlur` and `onSubmit` for better UX.

### Mock Service Worker (MSW)

MSW is used for API mocking during development:

- Controlled by `VITE_ENABLE_MSW` environment variable
- Handlers defined in `src/mocks/handlers.ts`
- Only runs in development when enabled
- **Test credentials**: username: `admin`, password: `Admin123`

When adding new API endpoints:
1. Add handler to `src/mocks/handlers.ts`
2. Use `delay()` to simulate network latency
3. Return `HttpResponse.json()` with realistic data structure

### Environment Variables

Environment variables are prefixed with `VITE_`:

- `.env.development` - Local development (MSW enabled)
- `.env.production` - Production build (MSW disabled, real API URL)
- Access via `import.meta.env.VITE_*`

Key variables:
- `VITE_API_BASE_URL` - API base URL
- `VITE_ENABLE_MSW` - Enable/disable MSW
- `VITE_APP_TITLE` - Application title

### Router Structure

React Router v6 with nested routes and protection:

```
/login (public)
/ (protected by ProtectedRoute)
  ├─ / (App layout with sidebar)
  │   ├─ / (HomePage - index route)
  │   └─ /withdraw-platform (WithdrawPlatformPage)
```

When adding new pages:
1. Create page component in `src/pages/`
2. Add route to `src/router.tsx`
3. If route requires auth, nest it under `ProtectedRoute`
4. Add navigation link to `App.tsx` sidebar if needed

### Component Patterns

**FormInput Component**: Unified input component that handles both text and password fields:
```tsx
<FormInput
  type="password"  // Automatically shows show/hide toggle
  type="text"      // Standard text input
  error={errors.field}
  onBlur={handleBlur}
/>
```

**Loading Component**: Tailwind-based loading spinner with multiple modes:
```tsx
<Loading size="md" />                    // Inline loading
<Loading size="lg" fullScreen />         // Full screen overlay
<Loading message="載入中..." />          // With message
```

### Code Comments

All code files contain comprehensive Traditional Chinese comments (繁體中文註解). When modifying existing files, maintain this commenting style. New files should follow the same pattern:
- File header: Purpose and description
- Imports: Explain what each import is for
- Functions: JSDoc-style comments with parameters and returns
- Complex logic: Inline comments explaining the "why"

### Git Workflow

This project uses conventional commits with bilingual messages (English + Chinese):

```bash
# Format
<type>(<scope>): <english description>

<chinese description in commit body>

# Examples
feat(auth): add login validation
新增登入表單驗證功能

fix(ui): correct button alignment
修正按鈕對齊問題
```

Common types: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`
