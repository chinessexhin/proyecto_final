router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM usuarios WHERE email=$1",
    [email]
  );

  if (result.rowCount === 0)
    return res.status(401).json({ msg: "usuario no existe" });

  const user = result.rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.status(401).json({ msg: "contraseña incorrecta" });

  const token = jwt.sign(
    { id: user.id, rol: user.rol },
    { expiresIn: "2h" }
  );

  res.json({ token });
});
