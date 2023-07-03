-- CreateTable
CREATE TABLE "AssetSnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "symbol" TEXT NOT NULL,
    "datetime" DATETIME NOT NULL,
    "vsUsd" DECIMAL NOT NULL,
    "marketCap" DECIMAL NOT NULL
);
