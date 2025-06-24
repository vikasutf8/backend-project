
import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import ProfileController from "../controllers/profileController.js";
import authMiddleware from "../middlwares/Authenticate.js";
const router =Router()


router.post("/auth/register",AuthController.register)
router.post("/auth/login",AuthController.login)


// profile routes
router.get("/profile",authMiddleware,ProfileController.index)
router.put("/profile/:id",authMiddleware,ProfileController.update)



export default router;