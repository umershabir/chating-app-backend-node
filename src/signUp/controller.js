import Users from "./model.js";
import { getToken } from "../../helpers/getToken.js";
// sign up controller
async function registerations(req, res, next) {
  let { fullName, email, password, accountType } = req.body;
  let user = await Users.findOne({ email });
  if (user) {
    res.status(400).json({ error: "user already registered" });
  } else {
    try {
      const newUser = new Users({
        fullName,
        email,
        password,
        accountType,
      });
      newUser.save().then(() => {
        res.status(201).json({
          response: {
            message: "signup successfully",
            token: getToken({ email, password }),
          },
        });
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
// login controller
async function login(req, res, next) {
  let { email, password } = req.body;
  const user = await Users.findOne({ email });
  console.log(email);
  if (user) {
    if (user.password === password) {
      res.status(200).json({ message: "login successfully" });
    } else {
      res.status(401).json({ error: "incorrect password" });
    }
  } else {
    res.status(404).json({ error: "you need to sign up first" });
  }
}
// exporting logic function
export { registerations, login };
