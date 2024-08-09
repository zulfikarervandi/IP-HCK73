'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorites.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Favorites.init({
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    movieName: DataTypes.STRING,
    movieImageUrl: DataTypes.TEXT,
    movieDesc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Favorites',
  });
  return Favorites;
};