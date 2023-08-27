/*
  Warnings:

  - The values [MALE,FEMALE,OTHER] on the enum `Sex` will be removed. If these variants are still used in the database, this will fail.
  - The values [SMALL,MEDIUM,BIG] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.
  - The values [CREATED,COMPLETED,CANCELED,APPROVED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Sex_new" AS ENUM ('MACHO', 'HEMBRA', 'OTRO');
ALTER TABLE "Puppets" ALTER COLUMN "sex" DROP DEFAULT;
ALTER TABLE "Puppets" ALTER COLUMN "sex" TYPE "Sex_new" USING ("sex"::text::"Sex_new");
ALTER TYPE "Sex" RENAME TO "Sex_old";
ALTER TYPE "Sex_new" RENAME TO "Sex";
DROP TYPE "Sex_old";
ALTER TABLE "Puppets" ALTER COLUMN "sex" SET DEFAULT 'OTRO';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('CHICO', 'MEDIANO', 'GRANDE');
ALTER TABLE "Puppets" ALTER COLUMN "size" DROP DEFAULT;
ALTER TABLE "Puppets" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
ALTER TABLE "Puppets" ALTER COLUMN "size" SET DEFAULT 'MEDIANO';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('CREADO', 'COMPLETADO', 'CANCELADO');
ALTER TABLE "Payment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'CREADO';
COMMIT;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'CREADO';

-- AlterTable
ALTER TABLE "Puppets" ALTER COLUMN "size" SET DEFAULT 'MEDIANO',
ALTER COLUMN "sex" SET DEFAULT 'OTRO';
