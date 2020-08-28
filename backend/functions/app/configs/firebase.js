const Admin = require('firebase-admin');

const credentials = Admin.credential.applicationDefault();

Admin.initializeApp({ credentials });

module.exports = Admin.firestore();
