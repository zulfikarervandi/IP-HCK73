const { Favorites } = require("../models");

class MovieController {
  static async addFavorite(req, res, next) {
    try {
        req.body.userId = req.user.id;
      let data = await Favorites.create(req.body, {
        userId: req.user.id,
      });
      res.status(200).json({ message: `success added to favorite` });
    } catch (error) {
      next(error);
    }
  }

  static async getMovieById(req, res, next) {
      const { id } = req.params;
    try {
      let data = await Favorites.findByPk(id);
      if (!data) {
        throw { name: `not-found` };
      }
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteFavorite(req, res, next) {
    try {
      let data = await Favorites.findByPk(id);
      if (!data) {
        throw { name: `not-found` };
      }
      await Favorites.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: `Deleted your fovorite movie` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController