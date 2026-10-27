const fs = require('fs');
const path = require('path');

const commands = new Map();
const aliases = new Map();

for (const file of fs.readdirSync(__dirname)) {
  if (file === 'index.js' || !file.endsWith('.js')) continue;
  const cmd = require(path.join(__dirname, file));
  commands.set(cmd.name, cmd);
  (cmd.aliases || []).forEach((a) => aliases.set(a, cmd.name));
}

function get(name) {
  const n = name.toLowerCase();
  return commands.get(n) || commands.get(aliases.get(n));
}

module.exports = { commands, get };
