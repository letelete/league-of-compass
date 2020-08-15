const admin = require('firebase-admin');

const credentials = admin.credential.applicationDefault();
admin.initializeApp({ credentials });

const database = admin.firestore();

module.exports = database;
