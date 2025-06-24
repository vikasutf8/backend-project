
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if(token === undefined || token === null){ 
    res.status(401).json({
      status: 401,
      message: "No Token ! Please login again",
    });
  }
    const tokenData = token.split(" ");
    if (tokenData[0] === "Bearer") {
      const decodedToken = jwt.verify(tokenData[1], process.env.JWT_SECRET);
      req.user = decodedToken;
      next();
    } else {
      res.status(401).json({
        status: 401,
        message: "Invalid Token ! Please login again",
      });
    }
  }; 
 


export default authMiddleware;