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
