import { Router } from "express";
import authRoutes from "./auth.routes";
/* import userRoutes from "./user.routes";
import clientRoutes from "./client.routes";
import paymentRoutes from "./payment.routes";
import loanRoutes from "./loan.routes";
import notificationRoutes from './notification.routes'
import employeeRoutes from './employee.routes'
 */


const apiRouter = Router();

// Aquí montamos todos los routers secundarios
apiRouter.use("/auth", authRoutes);

/* apiRouter.use("/users", userRoutes);
apiRouter.use("/clients", clientRoutes);
apiRouter.use("/loans", loanRoutes);
apiRouter.use("/payments", paymentRoutes);
apiRouter.use("/notifications", notificationRoutes);
apiRouter.use("/employee", employeeRoutes);
 */


/*

apiRouter.use("/quizzes", quizzRoutes);
apiRouter.use("/exams", examRoutes);
apiRouter.use("/sessions", sessionRoutes); */

export default apiRouter;
