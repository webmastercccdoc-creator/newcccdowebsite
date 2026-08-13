export default function Navbar() {
    return (
        <nav className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="font-semibold">Admin Navbar</div>
                <div>
                    <button className="rounded bg-indigo-600 px-3 py-1 text-white">Logout</button>
                </div>
            </div>
        </nav>
    );
}
