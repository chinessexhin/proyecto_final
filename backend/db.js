import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cafeteria",
  password: "contraseña",
  port: 5432,
});
