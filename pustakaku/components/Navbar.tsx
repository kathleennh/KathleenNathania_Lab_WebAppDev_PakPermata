import Link from "next/link";

export default function Navbar() {
    return (
        <header className="border-b bg-white">
            <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3">
                <Link href="/" className="text-lg font-bold text-gray-900">
                    Pustakaku
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                    <Link href="/" className="text-gray-700 hover:text-black">
                        Beranda
                    </Link>
                    <Link href="/buku" className="text-gray-700 hover:text-black">
                        Daftar Buku
                    </Link>
                    <Link
                        href="/buku/baru"
                        className="rounded bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-800"
                    >
                        + Tambah buku
                    </Link>
                </div>
            </nav>
        </header>
    );
}