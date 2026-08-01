# Project Structure

This project combines Laravel with Inertia.js and React. Laravel handles backend routing, authentication, and server responses, while the React frontend lives in `resources/js` and is built by Vite.

## High-level flow

1. `vite.config.js` points Vite at `resources/js/main.jsx`.
2. `resources/views/app.blade.php` loads the Vite assets and renders the Inertia page container.
3. `resources/js/main.jsx` imports `resources/js/App.jsx`.
4. `App.jsx` configures `createInertiaApp()` and resolves page components from `resources/js/pages/`.
5. Laravel routes call `Inertia::render(...)` with component names.
6. React renders the matching page component from the `pages/` directory.

### Flow chart

```mermaid
flowchart TD
    A[Vite Config: vite.config.js] --> B[Vite Entry: resources/js/main.jsx]
    B --> C[App Init: resources/js/App.jsx]
    C --> D[Resolve Page: resources/js/pages/*]
    E[Laravel Route] --> F[Inertia::render('section/Page')]
    F --> D
    D --> G[Render Page Component]
    G --> H[Render Layout + Components]
    H --> I[Browser DOM]
    subgraph Laravel
      E
    end
    subgraph Frontend
      A --> B --> C --> D --> G --> H --> I
    end
```

## Frontend structure

The frontend is organized by responsibility:

- `main.jsx` — Vite app entry
- `App.jsx` — Inertia app bootstrap
- `bootstrap.js` — shared JavaScript setup
- `layouts/` — shared page wrappers
- `components/` — reusable UI pieces
- `pages/` — top-level Inertia pages
- `routes/` — client-side route utilities
- `services/` — API and auth helpers
- `context/` — React context providers
- `hooks/` — reusable hooks

### Directory tree

```
resources/js/
  main.jsx
  App.jsx
  bootstrap.js
  layouts/
    AdminLayout.jsx
    AuthLayout.jsx
    MainLayout.jsx
  components/
    admin/
      Sidebar.jsx
      Topbar.jsx
      Footer.jsx
    content/
      Navbar.jsx
      Header.jsx
      Footer.jsx
  pages/
    content/
      Home.jsx
      About.jsx
      Programs.jsx
      News.jsx
      Contact.jsx
      NotFound.jsx
    admin/
      Dashboard.jsx
      Users.jsx
    auth/
      Login.jsx
      Register.jsx
      AdminLogin.jsx
    Profile/
      Edit.jsx
  routes/
    AppRoutes.jsx
    ProtectedRoute.jsx
  services/
    api.js
    auth.js
  context/
    AuthContext.jsx
  hooks/
    useAuth.js
```

### `resources/js/main.jsx`
- Entry point used by Vite.
- Imports `App.jsx` so the Inertia app is initialized.

Example:
```js
import './App.jsx';
```

### `resources/js/App.jsx`
- Configures Inertia with `createInertiaApp()`.
- Resolves pages using `resolvePageComponent()` and `import.meta.glob()`.
- Renders the React root.

Example:
```js
createInertiaApp({
  resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
```

### `resources/js/bootstrap.js`
- Sets up global client behavior such as Axios defaults.
- Shared utilities can be added here for all pages.

### `resources/js/layouts/`
Layouts define common page structure and shell UI.

- `MainLayout.jsx` — public-facing section layout with navbar and footer.
- `AuthLayout.jsx` — centered auth pages like login/register/profile.
- `AdminLayout.jsx` — admin UI wrapper with sidebar and topbar.

Use layouts inside page components to keep page logic separate from shared chrome.

### `resources/js/components/`
Components are reusable UI fragments.

- `components/content/` holds public site components: `Navbar`, `Header`, `Footer`.
- `components/admin/` holds admin-specific pieces: `Sidebar`, `Topbar`, `Footer`.

Example usage:
```js
import Navbar from '../../components/content/Navbar';
import Footer from '../../components/content/Footer';
```

### `resources/js/pages/`
This is the main Inertia page directory.

- `pages/content/` — public pages used for the main site.
- `pages/admin/` — admin dashboard pages.
- `pages/auth/` — authentication-related pages.
- `pages/Profile/` — profile and account pages.

Each page exports a default component and usually wraps its content in a layout.

### `resources/js/routes/`
Client-side route utilities.

- `AppRoutes.jsx` can define route records for React router usage.
- `ProtectedRoute.jsx` guards client-side routes when auth is required.

### `resources/js/services/`
API helpers and abstractions.

- `api.js` creates an Axios instance.
- `auth.js` defines auth API calls like `login()` and `logout()`.

### `resources/js/context/`
Global React state providers.

- `AuthContext.jsx` provides auth state and can be expanded for user info.

### `resources/js/hooks/`
Reusable hooks.

- `useAuth.js` exposes the auth context in page components.

## Laravel integration details

### `vite.config.js`
The Vite config uses the Laravel Vite plugin with the React plugin.

Important setting:
```js
laravel({
  input: 'resources/js/main.jsx',
  refresh: true,
})
```

### `resources/views/app.blade.php`
This Blade view bootstraps the Inertia app and injects assets.

It should include:
```blade
@routes
@viteReactRefresh
@vite(['resources/js/main.jsx', "resources/js/pages/{$page['component']}.jsx"])
@inertiaHead
```

### `routes/web.php`
Laravel routes render Inertia pages by component name.

Example:
```php
Route::get('/', function () {
  return Inertia::render('content/Home');
});

Route::get('/dashboard', function () {
  return Inertia::render('admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
```

### Page naming convention

The string passed to `Inertia::render()` maps to the file path in `resources/js/pages/`.

| Inertia component | File path |
|---|---|
| `content/Home` | `resources/js/pages/content/Home.jsx` |
| `auth/Login` | `resources/js/pages/auth/Login.jsx` |
| `Profile/Edit` | `resources/js/pages/Profile/Edit.jsx` |

## Adding a new page

1. Create the page file in `resources/js/pages/<section>/<Name>.jsx`
2. Use a layout from `resources/js/layouts/` if needed.
3. Add any shared UI to `components/` if reusable.
4. Render the page from Laravel with the matching Inertia component string.
5. Confirm the file path matches the component name exactly.

### Example: add a public page with `MainLayout`

Suppose you want to add a new public page called `resources/js/pages/content/Services.jsx`.

- The page file should export a React component and wrap content in `MainLayout`:

```jsx
import MainLayout from '../../layouts/MainLayout';

export default function Services() {
  return (
    <MainLayout title="Services">
      <div className="space-y-6">
        <p>Services page content goes here.</p>
      </div>
    </MainLayout>
  );
}
```

- Then define a Laravel route in `routes/web.php`:

```php
Route::get('/services', function () {
    return Inertia::render('content/Services');
});
```

- When a browser navigates to `/services`, Laravel matches the route, calls `Inertia::render('content/Services')`, and Inertia loads `resources/js/pages/content/Services.jsx`.
- The page component uses `MainLayout`, so the rendered HTML includes the public site's navbar, wrapper, and footer from `MainLayout.jsx`.

This makes the route flow:

1. Browser requests `/services`
2. Laravel matches the route in `routes/web.php`
3. Route returns `Inertia::render('content/Services')`
4. Inertia resolves `resources/js/pages/content/Services.jsx`
5. React renders `Services` inside `MainLayout`
6. User sees the fully rendered public page with shared layout chrome

## Running the project

- `npm run dev` — start Vite development server
- `npm run build` — build production assets
- `php artisan serve` or your local Laravel server — run backend

## Best practices

- Keep page logic inside `pages/`, not in shared layout files.
- Use `layouts/` only for repeated page chrome.
- Keep `components/` small and reusable.
- Match Inertia component names to page directories exactly.
- Add new API helpers in `services/` instead of using `axios` directly in pages.
