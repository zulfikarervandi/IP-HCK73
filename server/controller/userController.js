const { comparePassword, hashPassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, dateOfBirth, email, password } = req.body;
      let data = await User.create({
        username,
        dateOfBirth,
        email,
        password,
      });
      res.status(200).json({ id: data.id, email: data.email });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "login-failed" };
      }
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "login-failed" };
      }
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  static async updateUser(req, res, next) {
    const { id } = req.params;

    try {
        let data = User.findByPk(id)
        if (!data) {
            throw { name: `not-found` };
        }
        await User.update(req.body, {
          where: {
            id: id,
          },
          individualHooks: true,
        });
        res.status(200).json({message: "User has been updated"})
    } catch (error) {
        next(error)
    }
  }
}

module.exports = UserController;
