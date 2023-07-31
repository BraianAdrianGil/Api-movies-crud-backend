const app = require("../app");
const request = require("supertest");

let id;

test("GET /directors should bring all the directors", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
});

test("POST /directors should create a director", async () => {
  const body = {
    firstName: "Braian Director",
    lastName: "Gil",
    nationality: "Argentina",
    image: "braian-director-image.jpg",
    birthday: "1995-12-30",
  };

  const res = await request(app).post("/directors").send(body);
  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(body.firstName);
  expect(res.body.id).toBeDefined();
});

test("PUT /directors/:id should update the director of this id ", async () => {
  const newBody = {
    firstName: "Braian director actualizado",
  };
  const res = await request(app).put(`/directors/${id}`).send(newBody);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(newBody.firstName);
});

test("DELETE /directors/:id should delete the director of this id", async () => {
  const res = await request(app).delete(`/directors/${id}`);

  expect(res.status).toBe(204);
});
