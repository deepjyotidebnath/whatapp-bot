const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const config = require('./config');
const log = require('./utils/logger');
const commands = require('./commands');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] },
});

const cooldowns = new Map();

function isOwner(msg) {
  if (msg.fromMe) return true;
  const sender = (msg.author || msg.from || '').replace(/\D.*$/, '');
  return config.ownerNumber && sender === config.ownerNumber;
}

client.on('qr', (qr) => {
  log.info('Scan this QR with WhatsApp > Linked Devices');
  qrcode.generate(qr, { small: true });
});
client.on('authenticated', () => log.info('Authenticated'));
client.on('auth_failure', (m) => log.error('Auth failure:', m));
client.on('ready', () => log.info('Bot is ready ✅'));
client.on('disconnected', (reason) => {
  log.warn('Disconnected:', reason);
  client.initialize();
});

client.on('message_create', async (msg) => {
  try {
    if (msg.fromMe && !config.allowSelf) return;
    if (msg.isStatus) return;

    const body = (msg.body || '').trim();
    if (!body.startsWith(config.prefix)) return;

    const [name, ...args] = body.slice(config.prefix.length).split(/\s+/);
    const cmd = commands.get(name);
    if (!cmd) return;

    if (cmd.ownerOnly && !isOwner(msg)) return msg.reply('⛔ Owner only command.');

    const key = msg.author || msg.from;
    const last = cooldowns.get(key) || 0;
    if (Date.now() - last < config.cooldownMs) return;
    cooldowns.set(key, Date.now());

    log.info(`${key} -> ${config.prefix}${cmd.name} ${args.join(' ')}`);
    await cmd.run({ client, msg, args, config });
  } catch (err) {
    log.error('Command error:', err);
    msg.reply('⚠️ Something went wrong. Try again.').catch(() => {});
  }
});

process.on('unhandledRejection', (e) => log.error('Unhandled rejection:', e));

client.initialize();
