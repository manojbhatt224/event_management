import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default function handleAuthentication(req, res, next) {
  const client_accesstoken = req.headers.authorization?.split(" ")[1];
  try {
    if (client_accesstoken) {
      const user = jwt.verify(client_accesstoken, process.env.JWT_ACCESS_SECRET);
      if (user) {
        req.user = user;
        next();
      }
    } else {
      res.sendData(401, {error:"Authentication failed, provide valid token."});
    }
  } catch (error) {
    res.sendData(401, { error: `${error}` });
  }
}
