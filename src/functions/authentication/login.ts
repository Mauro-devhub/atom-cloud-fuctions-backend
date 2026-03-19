import * as functions from "@google-cloud/functions-framework";
import { Request, Response } from "express";

export const loginHandler = (req: Request, res: Response) => {
    res.send("Login")
}

functions.http("login", loginHandler);