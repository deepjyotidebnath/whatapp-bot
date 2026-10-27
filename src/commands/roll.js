module.exports = {
  name: 'roll',
  aliases: ['dice'],
  description: 'Roll a dice (optional sides)',
  usage: 'roll [sides]',
  async run({ msg, args }) {
    const sides = Math.min(Math.max(parseInt(args[0], 10) || 6, 2), 1000);
    await msg.reply(`🎲 d${sides}: *${Math.floor(Math.random() * sides) + 1}*`);
  },
};
