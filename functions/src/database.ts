import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert("./db.credential.json"),
  databaseURL: "https://atom-tecnical-test.firebaseio.com"
});

const db = admin.firestore()

export default db;