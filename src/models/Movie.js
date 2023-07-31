const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Movie = sequelize.define("movie", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  //actorId => relation in index.js file
  //directorId => relation in index.js file
  //genreId => relation in index.js file
});

module.exports = Movie;
