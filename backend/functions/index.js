const functions = require('firebase-functions');

const app = require('./app');
const invalidateGameData = require('./game_data_invalidation');

exports.app = functions.https.onRequest(app);
exports.invalidateGameData = functions
  .runWith({ timeoutSeconds: 90, memory: '256MB' })
  .firestore.document('lol/data')
  .onUpdate(invalidateGameData);
