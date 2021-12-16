require("dotenv").config();

const chatRepository = require("./chat-repository");
const { getClient } = require("./db");
const bot = require("./telegram-bot");

bot.start(async (ctx) => {
  ctx.reply(
    "Bem-vindo! Agora você receberá atualizações sobre o horário de içamento da ponte."
  );
  await chatRepository.addChat(ctx.chat.id);
});

bot.launch();

async function stop() {
  bot.stop();
  (await getClient()).close();
}

process.once("SIGINT", stop);
process.once("SIGTERM", stop);
