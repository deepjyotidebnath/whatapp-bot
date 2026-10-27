const config = require('../config');

module.exports = {
  name: 'time',
  aliases: ['date'],
  description: 'Current date and time',
  usage: 'time',
  async run({ msg }) {
    const now = new Date().toLocaleString('en-IN', { timeZone: config.timezone, dateStyle: 'full', timeStyle: 'medium' });
    await msg.reply(`🕒 ${now} (${config.timezone})`);
  },
};
