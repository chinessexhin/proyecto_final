import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register } = useUser();
  const navigate = useNavigate();

  const validarDatos = async (e) => {
    e.preventDefault();

    if (nombre === '' || email === '' || password === '' || confirmPassword === '') {
      window.alert("Todos los campos son obligatorios.");
      return;
    }

    if (password.length < 6) {
      window.alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      window.alert("Las contraseñas no coinciden.");
      return;
    }

    const success = await register({ email, password });

    if (success) {
      window.alert("Cuenta creada exitosamente!");
      navigate("/profile");
    } else {
      window.alert("Error al crear la cuenta.");
    }

    setNombre('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Registrate!</h2>
          <form className="p-4 border rounded shadow-sm bg-white" onSubmit={validarDatos}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tu nombre"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="tuemail@ejemplo.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirmar contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Repite tu contraseña"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
 )
}

export default register;