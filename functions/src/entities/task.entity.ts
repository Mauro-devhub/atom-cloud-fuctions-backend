import { EStateTask } from "../enums/task.enum";

export interface Task {
  id: string;
  email: string;
  title: string;
  description: string;
  dateExpire: string;
  stateTask: EStateTask;
}
