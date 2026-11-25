import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="rounded-lg border bg-white p-6 sm:p-10">
      <p className="text-sm font-medium text-gray-500">Sistem Perpustakaan Sekolah</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-black">Selamat Datang di Pustakaku</h1>
      <p className="mt-4 max-w-2xl text-gray-600">
        Pustakaku membantu pengelolaan katalog buku perpustakaan SMA secara digital, mulai dari
        mengecek ketersediaan stok buku, mencari judul atau penulis, melihat detail koleksi,
        hingga menambahkan buku baru.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/buku"
          className="rounded bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Daftar Buku
        </Link>
        <Link
          href="/buku/baru"
          className="rounded border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-100"
        >
          + Tambah buku
        </Link>
      </div>
    </section>
  );
}