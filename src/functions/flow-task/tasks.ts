import * as functions from "@google-cloud/functions-framework";
import { Request, Response } from "express";

export const tasksHandler = (req: Request, res: Response) => {
    res.send("Tasks")
}

functions.http("tasks", tasksHandler);