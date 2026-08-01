import Sidebar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Navbar';
import Footer from '../components/admin/Footer';

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
