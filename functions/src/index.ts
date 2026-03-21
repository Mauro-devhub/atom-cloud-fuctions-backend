import "reflect-metadata";
import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";

import * as tasksApi from "./routes/tasks.route";
import * as authenticationApi from "./routes/authentication.route";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.use(tasksApi.default);
app.use(authenticationApi.default);

exports.app = onRequest(app);

if ((process.env.K_SERVICE || process.env.PORT) && !process.env.FUNCTIONS_EMULATOR) {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}