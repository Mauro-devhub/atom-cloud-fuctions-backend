import * as functions from "@google-cloud/functions-framework";
import { Request, Response } from "express";

export const addTaskHandler = (req: Request, res: Response) => {
    res.send("Add Task")
}

functions.http("addTask", addTaskHandler);