export default function Footer() {
  return (
    <footer className="mt-6 rounded-2xl bg-white/70 backdrop-blur-sm p-3 text-sm text-gray-600 shadow-xl border border-gray-200/50">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">Admin Panel</span>
          <span className="text-xs text-gray-400">v2.0</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="text-gray-500">© 2026 City College of Cagayan de Oro</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
            Privacy Policy
          </a>
          <span className="hidden sm:inline text-gray-300">|</span>
          <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}