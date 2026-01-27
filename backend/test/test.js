import request from "supertest";
import app from "../index.js";

describe("test coffe", () => {

  test("GET /cafes → 200", async () => {
    const res = await request(app).get("/cafes");
    expect(res.status).toBe(200);
  });

  test("GET /privado sin tok1", async () => {
    const res = await request(app).get("/privado");
    expect(res.status).toBe(401);
  });

  test("Ruta inexistentee", async () => {
    const res = await request(app).get("/no-existe");
    expect(res.status).toBe(404);
  });

  test("POST mal hecho ", async () => {
    const res = await request(app).post("/cafes");
    expect(res.status).toBe(404);
  });

});
