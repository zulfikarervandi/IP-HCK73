const app = require("../app");
const {
  test,
  expect,
  describe,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const request = require("supertest");
const { Favorites, User, sequelize } = require("../models");
const { signToken } = require("../helper/jwt");  

let accessToken;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const user = await User.create({
    id: 1,
    username: "john_doe",
    email: "john.doe@example.com",
    password: "password123",
    dateOfBirth: "1990-01-09",
  });
  await Favorites.create({
    userId: 1,
    movieId: 123,
    movieName: "Inception",
    movieImageUrl: "https://example.com/inception.jpg",
    movieDesc:
      "A thief who enters the dreams of others to steal secrets from their subconscious.",
  });

  // Generate a valid access token
  accessToken = signToken({ id: user.id, email: user.email });
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Favorites.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.close();
});

describe("POST /favorites", () => {
  test("POST /favorites success should return success message", async () => {
    let response = await request(app)
      .post("/favorites")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        movieId: 456,
        movieName: "The Matrix",
        movieImageUrl: "https://example.com/matrix.jpg",
        movieDesc:
          "A computer programmer discovers the shocking truth about his reality.",
      });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "success added to favorite"
    );
  });

  test("POST /favorites failed should return error message if movie is already favorited", async () => {
    let response = await request(app)
      .post("/favorites")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        movieId: 123,
        movieName: "Inception",
        movieImageUrl: "https://example.com/inception.jpg",
        movieDesc:
          "A thief who enters the dreams of others to steal secrets from their subconscious.",
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Movie already added to favorites"
    );
  });
});

describe("GET /favorites", () => {
  test("GET /favorites success should return list of favorite movies", async () => {
    let response = await request(app)
      .get("/favorites")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("movieId", 123);
    expect(response.body[0]).toHaveProperty("movieName", "Inception");
    expect(response.body[0]).toHaveProperty(
      "movieImageUrl",
      "https://example.com/inception.jpg"
    );
    expect(response.body[0]).toHaveProperty(
      "movieDesc",
      "A thief who enters the dreams of others to steal secrets from their subconscious."
    );
  });
});

describe("DELETE /favorites/:id", () => {
  test("DELETE /favorites/:id success should return success message", async () => {
    let response = await request(app)
      .delete("/favorites/1")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Deleted your favorite movie"
    );
  });

  test("DELETE /favorites/:id failed should return error message if favorite not found", async () => {
    let response = await request(app)
      .delete("/favorites/999")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Data not found");
  });
});

describe("Authentication", () => {
  test("Should return 401 for invalid token", async () => {
    let response = await request(app)
      .get("/favorites")
      .set("Authorization", "Bearer invalid_token");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "UnAuthenticate");
  });
});
