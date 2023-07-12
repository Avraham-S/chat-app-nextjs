/*
  Warnings:

  - You are about to drop the `_g_chatToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_g_chatToUser" DROP CONSTRAINT "_g_chatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_g_chatToUser" DROP CONSTRAINT "_g_chatToUser_B_fkey";

-- DropTable
DROP TABLE "_g_chatToUser";

-- CreateTable
CREATE TABLE "_UserTog_chat" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserTog_chat_AB_unique" ON "_UserTog_chat"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTog_chat_B_index" ON "_UserTog_chat"("B");

-- AddForeignKey
ALTER TABLE "_UserTog_chat" ADD CONSTRAINT "_UserTog_chat_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTog_chat" ADD CONSTRAINT "_UserTog_chat_B_fkey" FOREIGN KEY ("B") REFERENCES "g_chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
