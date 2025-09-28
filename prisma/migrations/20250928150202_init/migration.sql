-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "breed" TEXT,
    "ageGroup" TEXT NOT NULL,
    "approximateAge" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "vaccinated" BOOLEAN NOT NULL DEFAULT false,
    "neutered" BOOLEAN NOT NULL DEFAULT false,
    "temperament" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
