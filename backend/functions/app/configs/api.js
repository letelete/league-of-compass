const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api-leagueofcompass.web.app'
    : 'http://localhost:5001/leagueofcompass/us-central1/app';

module.exports = {
  URL,
};
