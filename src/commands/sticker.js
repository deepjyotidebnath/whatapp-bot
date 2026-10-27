module.exports = {
  name: 'sticker',
  aliases: ['s'],
  description: 'Convert an image to a sticker (send with caption or reply to an image)',
  usage: 'sticker',
  async run({ client, msg }) {
    let target = msg;
    if (!msg.hasMedia && msg.hasQuotedMsg) target = await msg.getQuotedMessage();
    if (!target.hasMedia) return msg.reply('Send an image with the caption !sticker, or reply to an image.');

    const media = await target.downloadMedia();
    if (!media || !media.mimetype.startsWith('image')) return msg.reply('Only images are supported.');

    await client.sendMessage(msg.from, media, {
      sendMediaAsSticker: true,
      stickerName: 'WhatsApp Bot',
      stickerAuthor: 'Bot',
    });
  },
};
