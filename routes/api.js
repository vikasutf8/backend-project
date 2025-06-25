
import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import ProfileController from "../controllers/profileController.js";
import authMiddleware from "../middlwares/Authenticate.js";
import NewsController from "../controllers/NewsController.js";
import redisCache from "../DB/redis.config.js";
const router =Router()


router.post("/auth/register",AuthController.register)
router.post("/auth/login",AuthController.login)
router.get("/send-email",AuthController.sendTestEmail)

// profile routes
router.get("/profile",authMiddleware,ProfileController.index)
router.put("/profile/:id",authMiddleware,ProfileController.update)



//news controllers
router.get("/news",redisCache.route({expire: 60*60}) ,NewsController.index)
router.post("/news",authMiddleware,NewsController.store)
router.get("/news/:id",NewsController.show)
router.put("/news/:id",authMiddleware,NewsController.update)    
router.delete("/news/:id",authMiddleware,NewsController.distory)

export default router;