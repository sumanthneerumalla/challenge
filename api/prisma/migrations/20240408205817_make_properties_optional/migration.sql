-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "appId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT,
    "lastName" TEXT,
    "dateOfBirth" DATETIME,
    "streetAddress" TEXT,
    "city" TEXT,
    "state" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Application" ("appId", "city", "createdAt", "dateOfBirth", "firstName", "lastName", "state", "streetAddress", "updatedAt") SELECT "appId", "city", "createdAt", "dateOfBirth", "firstName", "lastName", "state", "streetAddress", "updatedAt" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
CREATE TABLE "new_Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vin" TEXT,
    "year" INTEGER,
    "make" TEXT,
    "model" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appId" INTEGER,
    CONSTRAINT "Vehicle_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Application" ("appId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("appId", "createdAt", "id", "make", "model", "updatedAt", "vin", "year") SELECT "appId", "createdAt", "id", "make", "model", "updatedAt", "vin", "year" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE UNIQUE INDEX "Vehicle_id_key" ON "Vehicle"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
