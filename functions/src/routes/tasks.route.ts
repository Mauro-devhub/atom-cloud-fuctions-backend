import { Router } from "express";
import { ROUTE_MODULES } from "../route-modules";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";
import { TaskService } from "../service/task.service";

const router = Router();

const api = ROUTE_MODULES.prefix + ROUTE_MODULES.modules.tasks;

router.use(api, authMiddleware);

router.post(api, validationMiddleware(CreateTaskDto), async (req, res) => {
  const { email } = (req as any).user;
  return TaskService.create(email, req.body, res);
})

router.get(api, async (req, res) => {
  const { email } = (req as any).user;
  return TaskService.findAllByEmail(email, res);
})

router.get(`${api}/:id`, async (req, res) => {
  return TaskService.findById(req.params.id, res);
})

router.patch(`${api}/:id`, validationMiddleware(UpdateTaskDto), async (req, res) => {
  return TaskService.update(`${req.params.id}`, req.body, res);
})

router.delete(`${api}/:id`, async (req, res) => {
  return TaskService.delete(req.params.id, res);
})

export default router;
