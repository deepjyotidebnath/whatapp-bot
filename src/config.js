require('dotenv').config();

module.exports = {
  prefix: process.env.PREFIX || '!',
  ownerNumber: (process.env.OWNER_NUMBER || '').replace(/\D/g, ''),
  allowSelf: process.env.ALLOW_SELF === 'true',
  geminiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
  timezone: process.env.TIMEZONE || 'Asia/Kolkata',
  cooldownMs: 2000,
};
