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
