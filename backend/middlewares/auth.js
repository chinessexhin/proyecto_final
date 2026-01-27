import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO usuarios (nombre, email, password) VALUES ($1,$2,$3) RETURNING id,email,rol",
    [nombre, email, hash]
  );

  res.json(result.rows[0]);
});

export default router;
