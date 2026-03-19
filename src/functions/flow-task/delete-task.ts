import * as functions from "@google-cloud/functions-framework";
import { Request, Response } from "express";

export const deleteTaskHandler = (req: Request, res: Response) => {
    res.send("Delete Task")
}

functions.http("deleteTask", deleteTaskHandler);