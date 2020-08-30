const Admin = require('firebase-admin');

const initializeApp = () => {
  const credentials = Admin.credential.applicationDefault();
  Admin.initializeApp({ credentials });
};

initializeApp();

const Database = Admin.firestore();

const FieldValue = Admin.firestore.FieldValue;

module.exports = { Database, FieldValue };
