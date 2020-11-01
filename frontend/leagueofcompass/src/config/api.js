export default {
  BASE_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://api-leagueofcompass.web.app'
      : 'http://localhost:5001/leagueofcompass/us-central1/app',
  ENDPOINTS: {
    AUTH: {
      GOOGLE: '/auth/google',
    },
    RATINGS: {
      ALL: '/ratings',
      SPECIFIC: (championId) => `/ratings/${championId}`,
    },
  },
};
