const config = require('../config');

const UNITS = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
const MAX_MS = 7 * UNITS.d;

module.exports = {
  name: 'remind',
  aliases: ['reminder'],
  description: 'Set a reminder, e.g. remind 10m drink water',
  usage: 'remind <10s|5m|2h|1d> <text>',
  async run({ client, msg, args }) {
    const match = /^(\d+)([smhd])$/i.exec(args[0] || '');
    const text = args.slice(1).join(' ');
    if (!match || !text) return msg.reply(`Usage: ${config.prefix}remind 10m drink water`);

    const delay = parseInt(match[1], 10) * UNITS[match[2].toLowerCase()];
    if (delay > MAX_MS) return msg.reply('Max reminder time is 7 days.');

    await msg.reply(`⏰ Reminder set for ${args[0]}.`);
    setTimeout(() => {
      client.sendMessage(msg.from, `⏰ *Reminder:* ${text}`).catch(() => {});
    }, delay);
  },
};
