import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import { verificarToken } from "./middlewares/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/cafes", async (req, res) => {
  const result = await pool.query("SELECT * FROM cafes");
  res.json(result.rows);
});

app.get("/privado", verificarToken, (req, res) => {
  res.json({
    msg: "token valido",
    user: req.user
  });
});

export default app;

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Servidor activo 3000 ");
  });
}
;
