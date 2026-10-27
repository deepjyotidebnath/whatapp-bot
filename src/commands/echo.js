const config = require('../config');

module.exports = {
  name: 'echo',
  description: 'Repeat your text',
  usage: 'echo <text>',
  async run({ msg, args }) {
    const text = args.join(' ').replace(new RegExp(`^\\${config.prefix}+`), '');
    await msg.reply(text || `Usage: ${config.prefix}echo <text>`);
  },
};
