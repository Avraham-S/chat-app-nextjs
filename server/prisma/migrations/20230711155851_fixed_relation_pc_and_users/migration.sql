/*
  Warnings:

  - You are about to drop the column `usersId` on the `g_chat` table. All the data in the column will be lost.
  - You are about to drop the `_UPCs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UPCs" DROP CONSTRAINT "_UPCs_A_fkey";

-- DropForeignKey
ALTER TABLE "_UPCs" DROP CONSTRAINT "_UPCs_B_fkey";

-- AlterTable
ALTER TABLE "g_chat" DROP COLUMN "usersId";

-- DropTable
DROP TABLE "_UPCs";

-- CreateTable
CREATE TABLE "_g_chatToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_g_chatToUser_AB_unique" ON "_g_chatToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_g_chatToUser_B_index" ON "_g_chatToUser"("B");

-- AddForeignKey
ALTER TABLE "_g_chatToUser" ADD CONSTRAINT "_g_chatToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "g_chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_g_chatToUser" ADD CONSTRAINT "_g_chatToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
