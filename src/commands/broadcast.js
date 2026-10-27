const config = require('../config');

module.exports = {
  name: 'broadcast',
  description: 'Owner only: send a message to all chats',
  usage: 'broadcast <text>',
  ownerOnly: true,
  async run({ client, msg, args }) {
    const text = args.join(' ');
    if (!text) return msg.reply(`Usage: ${config.prefix}broadcast <text>`);

    const chats = await client.getChats();
    let sent = 0;
    for (const chat of chats.filter((c) => !c.isGroup)) {
      await chat.sendMessage(text).catch(() => {});
      sent++;
      await new Promise((r) => setTimeout(r, 3000)); // slow down to reduce ban risk
    }
    await msg.reply(`Broadcast sent to ${sent} chats.`);
  },
};
