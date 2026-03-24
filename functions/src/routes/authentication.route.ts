import { Router } from "express";
import { ROUTE_MODULES } from "../route-modules";
import { validationMiddleware } from "../middleware/validation.middleware";
import { AuthDto } from "../dtos/auth.dto";
import { AuthenticationService } from "../service/authentication.service";

const router = Router();

const api = ROUTE_MODULES.prefix + ROUTE_MODULES.modules.auth;

router.use(api, validationMiddleware(AuthDto));

router.post(`${api}/login`, async (req, res) => {
  return AuthenticationService.login(req.body, res);
})

router.post(`${api}/register`, async (req, res) => {
  return AuthenticationService.register(req.body, res);
})

export default router;
