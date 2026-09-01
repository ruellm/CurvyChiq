import Link from "next/link";
import "../globals.css";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold font-serif text-gray-800">CurvyChiQ Admin</h1>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin" className="block p-3 rounded hover:bg-gray-50 text-gray-700 font-medium">
                                Inventory
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="block p-3 rounded hover:bg-gray-50 text-gray-700 font-medium">
                                View Store
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
