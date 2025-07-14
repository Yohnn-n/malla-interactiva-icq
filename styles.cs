body {
  background-color: #000;
  color: #fff;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* Contenedor principal con 6 columnas (6 años) */
.container {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  align-items: start;
}

/* Cada semestre se muestra como una columna con ramos hacia abajo */
.semestre {
  background-color: #111;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.semestre-titulo {
  font-size: 18px;
  font-weight: bold;
  color: #39ff14;
  text-align: center;
  margin-bottom: 10px;
}

.ramo {
  background-color: #111;
  border: 2px solid #444;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  min-width: 120px;
  min-height: 70px;
  transition: background-color 0.3s, border 0.3s, color 0.3s;
  white-space: pre-line;
}

.ramo:hover {
  border-color: #39ff14;
}

.ramo.aprobado {
  background-color: #39ff14;
  color: #000;
  border-color: #39ff14;
}

.ramo.bloqueado {
  opacity: 0.4;
  cursor: not-allowed;
}
