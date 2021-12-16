const { getDb } = require("./db");

const bridgeLiftingReportCollection = "bridge_lifting_reports";

async function getLastBridgeLiftingReport() {
  const db = await getDb();
  const lastBridgeLiftingReport = await db
    .collection(bridgeLiftingReportCollection)
    .find({})
    .sort({ created_at: -1 })
    .limit(1)
    .tryNext();

  return lastBridgeLiftingReport;
}

async function addBridgeLiftingReport(message) {
  const db = await getDb();

  await db.collection(bridgeLiftingReportCollection).insertOne({
    message: message,
    created_at: new Date(),
  });
}

module.exports = { getLastBridgeLiftingReport, addBridgeLiftingReport };
