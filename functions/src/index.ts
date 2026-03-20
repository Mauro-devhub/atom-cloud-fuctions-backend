import functions from "firebase-functions";
import express from "express";

import * as tasksApi from "./routes/tasks.route";
import * as authenticationApi from "./routes/authentication.route";

const app = express();

app.use(tasksApi.default);
app.use(authenticationApi.default);

exports.app = functions.https.onRequest(app);