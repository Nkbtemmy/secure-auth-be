import { Router, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../docs/index";
import authRouter from "./authRoutes";
import roleRouter from "./roleRoutes";
import userRouter from "./userRoutes";
import dashboardRoutes from "./dashboardRoutes";

const url = `/api/${process.env.API_VERSION || "v1"}`;
const router = Router();

router.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerOptions));

router.use(`${url}/auth`, authRouter);
router.use(`${url}/users`, userRouter);
router.use(`${url}/roles`, roleRouter);
router.use(`${url}/dashboard`, dashboardRoutes);

router.get('/', (req, res) => {
  res.send('Welcome to the Secure User API');
});
router.all(`${url}/`, (req: Request, res: Response | any) => {
  return res.status(200).send({
    status: 200,
    message: "Default Secure User Dashboard API",
  });
});


router.use((err: Error, _req: Request, res: Response | any, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).send({
    status: 500,
    message: "Something broke!",
  });
});

export default router;
