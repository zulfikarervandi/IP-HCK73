const { User } = require('../models');

async function isAuthorized(req, res, next) {
  try {
      let data = await User.findByPk(req.params.id);
      if (!data) {
        throw { name: "not-found" };
      }
      if (data.id !== req.user.id) {
        throw { name: "forbidden" };
      }
      next()
  } catch (error) {
    next(error);
  }
}

module.exports = isAuthorized