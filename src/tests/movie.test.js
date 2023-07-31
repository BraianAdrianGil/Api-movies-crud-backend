const app = require("../app");
const request = require("supertest");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models/index");

let id;

test("GET /movies should bring all the movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
});

test("POST /movies should create a movie", async () => {
  const body = {
    name: "Braian movie",
    image: "braian-movie-image.jpg",
    synopsis: "Braian's life history",
    releaseYear: "1995",
  };

  const res = await request(app).post("/movies").send(body);
  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(body.name);
  expect(res.body.id).toBeDefined();
});

test("PUT /movies/:id should update the movie of this id ", async () => {
  const newBody = {
    name: "Adventure",
  };
  const res = await request(app).put(`/movies/${id}`).send(newBody);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(newBody.name);
});

//SET ACTORS TEST==============================================================================
test("POST /movies/:id/actors should stablish the actors of this id movie", async () => {
  const actors = await Actor.create({
    firstName: "Braian actor",
    lastName: "Gil",
    nationality: "Argentina",
    image: "braian-actor-image.jpg",
    birthday: "1995-12-30",
  });

  const res = await request(app).post(`/movies/${id}/actors`).send([actors.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
  await actors.destroy();
});
//SET DIRECTORS TEST==============================================================================
test("POST /movies/:id/directors should stablish the directors of this id movie", async () => {
  const directors = await Director.create({
    firstName: "Braian director",
    lastName: "Gil",
    nationality: "Argentina",
    image: "braian-director-image.jpg",
    birthday: "1995-12-30",
  });

  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([directors.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
  await directors.destroy();
});
//SET GENRES TEST==============================================================================
test("POST /movies/:id/genres should stablish the genres of this id movie", async () => {
  const genres = await Genre.create({
    name: "Documental",
  });

  const res = await request(app).post(`/movies/${id}/genres`).send([genres.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
  await genres.destroy();
});

test("DELETE /movies/:id should delete the movie of this id", async () => {
  const res = await request(app).delete(`/movies/${id}`);

  expect(res.status).toBe(204);
});
