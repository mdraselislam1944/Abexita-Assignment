-- CreateTable
CREATE TABLE "doctor" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Organization',
    "orgOrPracticeId" TEXT NOT NULL,
    "usernameOrBusinessUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,
    "photo" TEXT,
    "category" TEXT NOT NULL,
    "subCategory" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL,
    "totalAppointment" INTEGER NOT NULL,
    "zones" TEXT[],
    "branches" TEXT[],
    "areaOfPractice" TEXT NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);
