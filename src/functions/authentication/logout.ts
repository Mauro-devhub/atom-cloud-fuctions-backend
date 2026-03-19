import * as functions from "@google-cloud/functions-framework";
import { Request, Response } from "express";

export const logoutHandler = (req: Request, res: Response) => {
    res.send("Logout")
}

functions.http("logout", logoutHandler);