async function getJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url.split('?')[0]}`);
  return res.json();
}

module.exports = { getJson };
