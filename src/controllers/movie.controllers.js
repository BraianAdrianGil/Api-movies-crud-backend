const catchError = require("../utils/catchError");
const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const getAll = catchError(async (req, res) => {
  const results = await Movie.findAll({ include: [Actor, Director, Genre] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Movie.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.findByPk(id, {
    include: [Actor, Director, Genre],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Movie.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setMovieGenres = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  await movie.setGenres(req.body);
  const genres = await movie.getGenres();
  return res.json(genres);
});

const setMovieActors = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  await movie.setActors(req.body);
  const actors = await movie.getActors();
  return res.json(actors);
});

const setMovieDirectors = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  await movie.setDirectors(req.body);
  const directors = await movie.getDirectors();
  return res.json(directors);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMovieDirectors,
  setMovieActors,
  setMovieGenres,
};
