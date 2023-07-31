const app = require("../app");
const request = require("supertest");

let id;

test("GET /genres should bring all the genres", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
});

test("POST /genres should create a genre", async () => {
  const body = {
    name: "Comedy",
  };

  const res = await request(app).post("/genres").send(body);
  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(body.name);
  expect(res.body.id).toBeDefined();
});

test("PUT /genres/:id should update the genre of this id ", async () => {
  const newBody = {
    name: "Adventure",
  };
  const res = await request(app).put(`/genres/${id}`).send(newBody);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(newBody.name);
});

test("DELETE /genres/:id should delete the genre of this id", async () => {
  const res = await request(app).delete(`/genres/${id}`);

  expect(res.status).toBe(204);
});
