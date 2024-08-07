const { Favorites } = require("../models");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.geminiApiKey);
class MovieController {
  static async addFavorite(req, res, next) {
    try {
      req.body.userId = req.user.id;
      const { movieId } = req.body;
      const userId = req.user.id;
      const existingFavorite = await Favorites.findOne({
        where: { userId, movieId },
      });
      if (existingFavorite) {
        throw { name: "already-add" };
      }
      let data = await Favorites.create(req.body, {
        userId: req.user.id,
      });
      res.status(200).json({ message: `success added to favorite` });
    } catch (error) {
      next(error);
    }
  }
  static async geminiAi(req,res,next){
    try {
        async function run() {
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          const { prompts } = req.body
          const prompt = `don't answer anything that not about movie recommendation ${prompts}`;
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          console.log(text);
        }

        run();
    } catch (error) {
        next(error)   
    }
  }
  static async getMovieById(req, res, next) {
    try {
      let data = await Favorites.findAll({where: 
        {
            userId: req.user.id
        }
      });
      if (!data) {
        throw { name: `not-found` };
      }
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteFavorite(req, res, next) {
      const { id } = req.params
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