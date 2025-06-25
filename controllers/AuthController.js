import prisma from "../DB/db.config.js";
import bcrypt from "bcryptjs";
import vine, { errors } from "@vinejs/vine";
import {
  AuthSchemaValidator,
  LoginSchemaValidator,
} from "../validations/AuthValidation.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/mailer.config.js";
import logger from "../config/logger.js";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      console.log(body);
      const validator = vine.compile(AuthSchemaValidator);
      const payload = await validator.validate(body);
      // mail unique
      const isUserExist = await prisma.users.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (isUserExist) {
        return res.status(400).json({
          status: 401,
          message: "User already exist ! Email should be unique",
        });
      }
      //password encryption
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(payload.password, salt);
      payload.password = hashedPassword;

      const user = await prisma.users.create({
        data: payload,
      });
      return res.json({
        status: 201,
        data: user,
        message: "User created successfully",
      });
      // return res.send({ payload });
    } catch (error) {
      console.log(error);
      if (error instanceof errors.E_VALIDATION_ERROR) {
        // console.log(error.messages)
        return res.status(400).json({
          message: error.messages,
        });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error !Please try again later",
        });
      }
    }
  }

  static async login(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(LoginSchemaValidator);
      const payload = await validator.validate(body);
      const user = await prisma.users.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (!user) {
        return res.status(400).json({
          status: 401,
          message: "User not found ! Please register first",
        });
      }
      if (!bcrypt.compareSync(payload.password, user.password)) {
        return res.status(400).json({
          status: 401,
          message: "Invalid Credentials ! Please try again",
        });
      }
      const payloadData = {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      };
      // JWT_SECRET
      const accessToken = jwt.sign(payloadData, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign(payloadData, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // delete payload.password;  //instead of payload generally using user object

      res.json({
        status: 200,
        data: payloadData,
        access_token: `Bearer ${accessToken}`,
        refresh_token: refreshToken,
        message: "Login Successful",
      });
    } catch (error) {

      if (error instanceof errors.E_VALIDATION_ERROR) {
        // console.log(error.messages)
        return res.status(400).json({
          message: error.messages,
        });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error !Please try again later",
        });
      }
    }
  }

  static async sendTestEmail(req,res){
    try {
      const {email} =req.query;
      const payload={
        toEmail : email,
        subject : "Test Email", 
        html : "<h1>Hello World ! I am Test Email</h1>"
      }
      await sendEmail(payload.toEmail,payload.subject,payload.html);
      return res.json({
        status: 200,
        message: "Email sent successfully",
      });
    } catch (error) {
      logger.error({type:"Email Error",body:error?.message});
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error !Please try again later",
      });
    }
  }
}

export default AuthController;
