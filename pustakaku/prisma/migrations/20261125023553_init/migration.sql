-- CreateTable
CREATE TABLE "Buku" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "tahunTerbit" INTEGER,
    "deskripsi" TEXT,
    "sampul" TEXT,
    "stokTersedia" INTEGER NOT NULL,
    "stokTotal" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
