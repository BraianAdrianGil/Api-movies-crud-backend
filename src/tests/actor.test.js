const app = require("../app");
const request = require("supertest");

let id;

test("GET /actors should bring all the actors", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
});

test("POST /actors should create an actor", async () => {
  const body = {
    firstName: "Braian Adrian",
    lastName: "Gil",
    nationality: "Argentina",
    image: "braian-image-example.jpg",
    birthday: "1995-12-30",
  };

  const res = await request(app).post("/actors").send(body);
  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(body.name);
  expect(res.body.id).toBeDefined();
});

test("PUT /actors/:id should update the actor of this id ", async () => {
  const newBody = {
    firstName: "Braian actualizado",
  };
  const res = await request(app).put(`/actors/${id}`).send(newBody);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(newBody.firstName);
});

test("DELETE /actors/:id should delete the actor of this id", async () => {
  const res = await request(app).delete(`/actors/${id}`);

  expect(res.status).toBe(204);
});
