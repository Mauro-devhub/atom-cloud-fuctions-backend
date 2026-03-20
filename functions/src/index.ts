import "reflect-metadata";
import { onRequest } from "firebase-functions/v2/https";
import express from "express";

import * as tasksApi from "./routes/tasks.route";
import * as authenticationApi from "./routes/authentication.route";

const app = express();

app.use(express.json()); 

app.use(tasksApi.default);
app.use(authenticationApi.default);

// Firebase Functions entry point
exports.app = onRequest(app);

// Cloud Run / Docker entry point
if (process.env.K_SERVICE || process.env.PORT) {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}