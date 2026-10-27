module.exports = {
  name: 'about',
  aliases: ['info'],
  description: 'About this bot',
  usage: 'about',
  async run({ msg }) {
    const up = process.uptime();
    const h = Math.floor(up / 3600);
    const m = Math.floor((up % 3600) / 60);
    await msg.reply(`🤖 *WhatsApp Bot*\nBuilt with whatsapp-web.js\nUptime: ${h}h ${m}m\nNode ${process.version}`);
  },
};
