import * as functions from "@google-cloud/functions-framework";
import { Request, Response } from "express";

export const registerHandler = (req: Request, res: Response) => {
    res.send("Register")
}

functions.http("register", registerHandler);