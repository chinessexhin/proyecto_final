router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM usuarios WHERE email=$1",
    [email]
  );

  if (result.rowCount === 0)
    return res.status(401).json({ msg: "Usuario no existe" });

  const user = result.rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.status(401).json({ msg: "Password incorrecta" });

  const token = jwt.sign(
    { id: user.id, rol: user.rol },
    "SECRETO_SUPER_PRO",
    { expiresIn: "2h" }
  );

  res.json({ token });
});
