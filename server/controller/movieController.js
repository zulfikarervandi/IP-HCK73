const { Favorites } = require("../models");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.geminiApiKey);
const axios = require("axios");

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
  static async getMovies(req, res, next) {
    try {
     const options = {
       method: "GET",
       url: "https://api.themoviedb.org/3/movie/popular?language=en-US",
       headers: {
         accept: "application/json",
         Authorization:
           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzQzN2VhZDNiOTUwNzgxODA5OWM3MGJlMjc2MTkyYSIsIm5iZiI6MTcyMzEwNTI4NC41MjA4MTQsInN1YiI6IjY2YjFkZDNlOTNjZGRhNjIyNjQ4M2E4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d742g62JwG1MKVup0WHEzcR8pC__YO1xIb8AqaiaX1c",
       },
     };
     const response = await axios(options)
     res.status(200).json(response.data)
    } catch (error) {
      next(error);
    }
  }
  static async geminiAi(req, res, next) {
    try {
      async function run() {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const { prompts } = req.body;
        console.log(prompts);
        const prompt = `don't answer anything that not about movie recommendation ${prompts}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.status(200).json(text)
      }
      run();
    } catch (error) {
      next(error);
    }
  }
  static async getMovieById(req, res, next) {
    try {
      let data = await Favorites.findAll({
        where: {
          userId: req.user.id,
        },
      });
      if (!data) {
        throw { name: `not-found` };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteFavorite(req, res, next) {
    const { id } = req.params;
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
      res.status(200).json({ message: `Deleted your favorite movie` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
