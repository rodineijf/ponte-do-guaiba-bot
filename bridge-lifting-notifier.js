require("dotenv").config();

const axios = require("axios");

const bot = require("./telegram-bot");
const { getClient } = require("./db");
const bridgeLiftingRepository = require("./bridge-lifting-report-repository");
const chatsRepository = require("./chat-repository");

async function getBridgeLiftingMessage() {
  const response = await axios.get(
    "https://www.ccrviasul.com.br/mobile/home/BridgeHoisting"
  );
  return response.data;
}

async function main() {
  const bridgeLiftingMessage = await getBridgeLiftingMessage();

  const lastBridgeLiftingReport =
    await bridgeLiftingRepository.getLastBridgeLiftingReport();

  const hasChanged =
    lastBridgeLiftingReport == null ||
    lastBridgeLiftingReport["message"] != bridgeLiftingMessage;

  if (hasChanged) {
    await bridgeLiftingRepository.addBridgeLiftingReport(bridgeLiftingMessage);

    const chats = await chatsRepository.getChats();

    await bot.launch();

    const tasks = chats.map((chat) =>
      bot.telegram.sendMessage(chat["telegram_chat_id"], bridgeLiftingMessage)
    );

    await Promise.all(tasks);

    bot.stop();
  }

  (await getClient()).close();
}

main();
