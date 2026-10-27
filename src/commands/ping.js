module.exports = {
  name: 'ping',
  description: 'Check if the bot is alive',
  usage: 'ping',
  async run({ msg }) {
    const start = Date.now();
    const sent = await msg.reply('pong 🏓');
    if (sent && sent.edit) await sent.edit(`pong 🏓 ${Date.now() - start}ms`).catch(() => {});
  },
};
