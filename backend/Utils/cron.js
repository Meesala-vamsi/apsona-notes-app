const cron = require('node-cron');
const Bin = require('../Models/binSchema');

cron.schedule('0 0 * * *', async () => {
  const cutoffDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  try {
    const result = await Bin.deleteMany({ deletedAt: { $lt: cutoffDate } });
    console.log(`Deleted ${result.deletedCount} old bin notes.`);
  } catch (error) {
    console.error('Error deleting old bin notes:', error);
  }
});
