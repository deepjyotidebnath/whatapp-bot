const config = require('../config');
const { getJson } = require('../utils/http');

const CODES = {
  0: 'Clear sky ☀️', 1: 'Mostly clear 🌤️', 2: 'Partly cloudy ⛅', 3: 'Overcast ☁️',
  45: 'Fog 🌫️', 48: 'Rime fog 🌫️', 51: 'Light drizzle 🌦️', 53: 'Drizzle 🌦️', 55: 'Heavy drizzle 🌧️',
  61: 'Light rain 🌧️', 63: 'Rain 🌧️', 65: 'Heavy rain 🌧️', 71: 'Light snow 🌨️', 73: 'Snow 🌨️', 75: 'Heavy snow ❄️',
  80: 'Rain showers 🌦️', 81: 'Rain showers 🌧️', 82: 'Violent showers ⛈️', 95: 'Thunderstorm ⛈️', 96: 'Thunderstorm + hail ⛈️', 99: 'Severe thunderstorm ⛈️',
};

module.exports = {
  name: 'weather',
  description: 'Current weather for a city (free, no key)',
  usage: 'weather <city>',
  async run({ msg, args }) {
    const city = args.join(' ');
    if (!city) return msg.reply(`Usage: ${config.prefix}weather <city>`);

    const geo = await getJson(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    const place = geo.results && geo.results[0];
    if (!place) return msg.reply(`Couldn’t find "${city}".`);

    const w = await getJson(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
        '&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code'
    );
    const c = w.current;
    await msg.reply(
      `*${place.name}, ${place.country || ''}*\n${CODES[c.weather_code] || 'Unknown'}\n` +
        `🌡️ ${c.temperature_2m}°C (feels ${c.apparent_temperature}°C)\n💧 ${c.relative_humidity_2m}%\n💨 ${c.wind_speed_10m} km/h`
    );
  },
};
