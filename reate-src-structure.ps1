# create-src-structure.ps1
$src = "resources/js/src"

# Directories to create
$dirs = @(
  "$src",
  "$src/layouts",
  "$src/pages",
  "$src/pages/admin",
  "$src/pages/content",
  "$src/components",
  "$src/components/admin",
  "$src/components/content",
  "$src/routes"
)
foreach ($d in $dirs) { if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null } }

# Helper to write file (overwrite)
function Write-File($path, $content) {
  $content | Set-Content -Path $path -Force -Encoding utf8
}

# Root entries
Write-File "$src/main.jsx" "import './App.jsx';"

Write-File "$src/App.jsx" @'
import "../../css/app.css";
import "../bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.jsx`,
      import.meta.glob("./pages/**/*.jsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
  progress: { color: "#4B5563" },
});
'@

# layouts
Write-File "$src/layouts/MainLayout.jsx" @'
import Navbar from "../components/content/Navbar";
import Footer from "../components/content/Footer";

export default function MainLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-6 text-3xl font-semibold">{title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
}
'@

Write-File "$src/layouts/AdminLayout.jsx" @'
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Navbar";
import Footer from "../components/admin/Footer";

export default function AdminLayout({ title, children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Topbar />
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="mb-4 text-2xl font-semibold">{title}</h1>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
'@

# components - content
Write-File "$src/components/content/Navbar.jsx" @'
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      <div className="text-lg font-semibold">Logo</div>
      <div className="space-x-4 text-slate-600">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/programs">Programs</a>
        <a href="/news">News</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}
'@

Write-File "$src/components/content/Header.jsx" @'
export default function Header() {
  return (
    <header className="rounded-3xl bg-indigo-600 px-8 py-12 text-white shadow-lg">
      <h1 className="text-3xl font-semibold">Welcome</h1>
      <p className="mt-3 text-lg text-indigo-100">Site header</p>
    </header>
  );
}
'@

Write-File "$src/components/content/Footer.jsx" @'
export default function Footer() {
  return (
    <footer className="mt-12 rounded-3xl bg-white p-6 text-sm text-slate-500 shadow-sm">
      <div className="mx-auto max-w-7xl">© Your Company</div>
    </footer>
  );
}
'@

# components - admin
Write-File "$src/components/admin/Sidebar.jsx" @'
export default function Sidebar() {
  return (
    <aside className="w-64 p-6 bg-white shadow-sm">
      <div className="font-semibold">Admin</div>
      <nav className="mt-4 space-y-2 text-slate-600">
        <a href="/dashboard">Dashboard</a>
        <a href="/admin/users">Users</a>
        <a href="/admin/settings">Settings</a>
      </nav>
    </aside>
  );
}
'@

Write-File "$src/components/admin/Navbar.jsx" @'
export default function Topbar() {
  return (
    <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Admin Panel</div>
        <button className="rounded bg-indigo-600 px-3 py-1 text-white">Logout</button>
      </div>
    </div>
  );
}
'@

Write-File "$src/components/admin/Footer.jsx" @'
export default function Footer() {
  return (
    <footer className="mt-6 rounded-2xl bg-white p-4 text-sm text-slate-500 shadow-sm">
      Admin footer
    </footer>
  );
}
'@

# pages - content
Write-File "$src/pages/content/Home.jsx" @'
import MainLayout from "../../layouts/MainLayout";
import Header from "../../components/content/Header";

export default function Home() {
  return (
    <MainLayout title="Home">
      <Header />
      <p className="mt-6">Home content placeholder.</p>
    </MainLayout>
  );
}
'@

Write-File "$src/pages/content/About.jsx" @'
import MainLayout from "../../layouts/MainLayout";

export default function About() {
  return (
    <MainLayout title="About">
      <p>This is the About page.</p>
    </MainLayout>
  );
}
'@

Write-File "$src/pages/content/Programs.jsx" @'
import MainLayout from "../../layouts/MainLayout";

export default function Programs() {
  return (
    <MainLayout title="Programs">
      <p>Programs page placeholder.</p>
    </MainLayout>
  );
}
'@

Write-File "$src/pages/content/News.jsx" @'
import MainLayout from "../../layouts/MainLayout";

export default function News() {
  return (
    <MainLayout title="News">
      <p>News page placeholder.</p>
    </MainLayout>
  );
}
'@

Write-File "$src/pages/content/Contact.jsx" @'
import MainLayout from "../../layouts/MainLayout";

export default function Contact() {
  return (
    <MainLayout title="Contact">
      <p>Contact page placeholder.</p>
    </MainLayout>
  );
}
'@

Write-File "$src/pages/content/Login.jsx" @'
import MainLayout from "../../layouts/MainLayout";

export default function Login() {
  return (
    <MainLayout title="Login">
      <p>Login page placeholder.</p>
    </MainLayout>
  );
}
'@

# pages - admin
Write-File "$src/pages/admin/Dashboard.jsx" @'
import AdminLayout from "../../layouts/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard">
      <p>Admin dashboard placeholder.</p>
    </AdminLayout>
  );
}
'@

Write-File "$src/pages/admin/Users.jsx" @'
import AdminLayout from "../../layouts/AdminLayout";

export default function Users() {
  return (
    <AdminLayout title="Users">
      <p>Users list placeholder.</p>
    </AdminLayout>
  );
}
'@

Write-File "$src/pages/admin/Settings.jsx" @'
import AdminLayout from "../../layouts/AdminLayout";

export default function Settings() {
  return (
    <AdminLayout title="Settings">
      <p>Settings placeholder.</p>
    </AdminLayout>
  );
}
'@

Write-File "$src/pages/admin/Profile.jsx" @'
import AdminLayout from "../../layouts/AdminLayout";

export default function Profile() {
  return (
    <AdminLayout title="Profile">
      <p>Profile placeholder.</p>
    </AdminLayout>
  );
}
'@

# routes
Write-File "$src/routes/AppRoutes.jsx" @'
import Home from "../pages/content/Home";
import About from "../pages/content/About";

export const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
];

export default appRoutes;
'@

# Update resources/js/main.jsx to import new src/main.jsx (if exists)
$rootMain = "resources/js/main.jsx"
if (Test-Path $rootMain) {
  (Get-Content $rootMain) -replace "import './App.jsx';", "import './src/main.jsx';" | Set-Content $rootMain -Force
}

# Update Blade to reference src pages for per-page assets
$bladePath = "resources/views/app.blade.php"
if (Test-Path $bladePath) {
  (Get-Content $bladePath) -replace "resources/js/pages/\\{\\$page\\['component'\\]\\}\\.jsx", "resources/js/src/pages/{$page['component']}.jsx" | Set-Content $bladePath -Force
}

Write-Output "resources/js/src structure created and entry points wired. Run 'npm run build' or 'npm run dev' to verify."