const jokes = [
  'Why do programmers prefer dark mode? Because light attracts bugs.',
  'There are 10 types of people: those who understand binary and those who don’t.',
  'A SQL query walks into a bar, sees two tables and asks: "Can I join you?"',
  'I would tell you a UDP joke, but you might not get it.',
  'Why did the developer go broke? He used up all his cache.',
  '!false - it’s funny because it’s true.',
];

module.exports = {
  name: 'joke',
  description: 'Random programming joke',
  usage: 'joke',
  async run({ msg }) {
    await msg.reply(jokes[Math.floor(Math.random() * jokes.length)]);
  },
};
