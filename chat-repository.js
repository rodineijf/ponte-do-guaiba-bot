const { getDb } = require("./db");

async function addChat(chatId) {
  const db = await getDb();
  const chatsCollection = await db.collection("chats");

  const count = await chatsCollection.countDocuments({
    telegram_chat_id: chatId,
  });

  if (count > 0) {
    return;
  }

  const chat = {
    telegram_chat_id: chatId,
    created_at: new Date(),
  };
  chatsCollection.insertOne(chat);
}

async function getChats() {
  const db = await getDb();
  return db.collection("chats").find({}).toArray();
}

module.exports = {
  addChat,
  getChats,
};
