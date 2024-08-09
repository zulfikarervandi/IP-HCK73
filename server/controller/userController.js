const { comparePassword, hashPassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

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
      res.status(201).json({ id: data.id, email: data.email });
    } catch (error) {
      next(error);      
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "no-email/password" };
      }
      if (!password) {
        throw { name: "no-email/password" };
      }
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
  static async gLogin(req, res, next) {
    const { googleToken, email } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      console.log(ticket,">>>>>>");
      
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          picture: payload.picture,
          provider: "google",
          password: "google_id",
        },
        hooks: false,
      });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.status(created ? 201 : 200).json({ access_token: token });
    } catch (error) {
      //   res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  }
  static async getUserById(req,res,next){
    try {
      let id = req.user.id
      let data = await User.findByPk(id);
      console.log(data,id);
      
      if (!data) {
        throw { name: `not-found` };
      }
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async updateUser(req, res, next) {
    const { id } = req.params;

    try {
      let data = User.findByPk(id);
      if (!data) {
        throw { name: `not-found` };
      }
      await User.update(req.body, {
        where: {
          id: id,
        },
        individualHooks: true,
      });
      res.status(200).json({ message: "User has been updated" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
