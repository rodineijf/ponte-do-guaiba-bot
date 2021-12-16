const { MongoClient } = require("mongodb");

let client;

async function getClient() {
  if (client) {
    return client;
  }

  client = new MongoClient(process.env.MONGO_URL);
  await client.connect();

  return client;
}

async function getDb() {
  return (await getClient()).db();
}

module.exports = { getClient, getDb };
