const config = require('../config');
const { getJson } = require('../utils/http');

module.exports = {
  name: 'ai',
  aliases: ['ask', 'gpt'],
  description: 'Ask the AI (free Gemini API key required)',
  usage: 'ai <question>',
  async run({ msg, args }) {
    if (!config.geminiKey) return msg.reply('AI is not configured. Set GEMINI_API_KEY in .env');
    const prompt = args.join(' ');
    if (!prompt) return msg.reply(`Usage: ${config.prefix}ai <question>`);

    const chat = await msg.getChat();
    await chat.sendStateTyping();

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.geminiModel}:generateContent?key=${config.geminiKey}`;
    const data = await getJson(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: 'You are a concise WhatsApp assistant. Keep answers under 1200 characters.' }] },
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      }),
    });

    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || 'No response.';
    await msg.reply(text.slice(0, 3500));
  },
};
