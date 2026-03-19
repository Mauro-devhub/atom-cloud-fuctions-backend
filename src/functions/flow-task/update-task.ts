import * as functions from "@google-cloud/functions-framework";
import { Request, Response } from "express";

export const updateTaskHandler = (req: Request, res: Response) => {
    res.send("Update Task")
}

functions.http("updateTask", updateTaskHandler);