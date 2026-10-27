const config = require('../config');

module.exports = {
  name: 'help',
  aliases: ['menu', 'h'],
  description: 'Show all commands',
  usage: 'help',
  async run({ msg }) {
    const { commands } = require('./index');
    const lines = [...commands.values()]
      .filter((c) => !c.ownerOnly)
      .map((c) => `${config.prefix}${c.usage || c.name} - ${c.description}`);
    await msg.reply(`*Available commands*\n\n${lines.join('\n')}`);
  },
};
