const request = require("supertest");
const app = require("./app");

describe("Todo Api", () => {
  it("Get /todos -->array todos", () => {
    return request(app)
      .get("/todos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });

  it("Get /todos/id -->specific todo by iD", () => {
    return request(app)
      .get("/todos/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });

  it("Get /todos/id -->404 if not found", () => {
    return request(app).get("/todos/9999999").expect(404);
  });

  it("Post /todos -->created todo", () => {
    return request(app)
      .post("/todos")
      .send({ name: "no dishes" })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: "no dishes",
            completed: false,
          })
        );
      });
  });

  it("Post /todos -->validates request body", () => {
    return request(app).post("/todos").send({ name: 123 }).expect(422);
  });
});
