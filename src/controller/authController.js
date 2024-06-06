import Token from "../helpers/tokenGenerator.js";
import { userDAO } from "../dao/userDAO.js";


class AuthController {
  static async loginUser(req, res)  {
    const { username, password } = req.body;
    if (!username || !password) {
      res.sendData(401, {
        error: "Please input required fields.",
      });
    }
    else{
    try {
      const user = await userDAO.findUserByUsernameAndPassword(username, password);
      if (user) {

        const token = Token.getToken(user);
        res.sendData(200, {
          user: user,
          token: token,
        });
      } else {
        res.sendData(401, { error: "Invalid Credentials." });
      }
    } catch (error) {
      res.sendData(401, { error: `${error}` });
    }
    }
  }

  static signupUser(req, res) {
    res.json({ msg: "Success", data: "Signup" });
  }
}

export { AuthController };
