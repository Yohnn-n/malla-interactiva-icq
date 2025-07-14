const ramos = [
  { codigo: "EIQ110", nombre: "Fund. Procesos Químicos", semestre: 1, requisitos: [] },
  { codigo: "MAT1001", nombre: "Fund. Matemáticas", semestre: 1, requisitos: [] },
  { codigo: "QUI100", nombre: "Química para Ing.", semestre: 1, requisitos: [] },
  { codigo: "FIN100", nombre: "Comunicación para Ing.", semestre: 1, requisitos: [] },
  { codigo: "ICR010", nombre: "Antropología Cristiana", semestre: 1, requisitos: [] },

  { codigo: "EIQ120", nombre: "Fund. de Ingeniería", semestre: 2, requisitos: ["EIQ110"] },
  { codigo: "MAT1002", nombre: "Cálculo Diferencial", semestre: 2, requisitos: ["MAT1001"] },
  { codigo: "QUI161", nombre: "Química Inorgánica", semestre: 2, requisitos: ["QUI100"] },
  { codigo: "ING9001", nombre: "Inglés 1", semestre: 2, requisitos: [] },

  { codigo: "EIQ220", nombre: "Balances de Materia", semestre: 3, requisitos: ["EIQ120"] },
  { codigo: "MAT1003", nombre: "Cálculo de Varias Vars", semestre: 3, requisitos: ["MAT1002"] },
  { codigo: "ICA213", nombre: "Economía", semestre: 3, requisitos: [] },
  { codigo: "FIS1002", nombre: "Física para Ingeniería", semestre: 3, requisitos: [] },

  { codigo: "EIQ242", nombre: "Fisicoquímica", semestre: 4, requisitos: ["EIQ220"] },
  { codigo: "MAT1005", nombre: "Ecuaciones Diferenciales", semestre: 4, requisitos: ["MAT1003"] },
  { codigo: "EIQ288", nombre: "Métodos Estadísticos", semestre: 4, requisitos: [] },
  { codigo: "EIQ262", nombre: "Ciencia de Materiales", semestre: 4, requisitos: [] },
  { codigo: "EIQ263", nombre: "Química Orgánica Ind.", semestre: 4, requisitos: [] },
  { codigo: "ING9002", nombre: "Inglés 2", semestre: 4, requisitos: ["ING9001"] },

  { codigo: "EIQ311", nombre: "Termodinámica Procesos", semestre: 5, requisitos: ["EIQ242"] },
  { codigo: "EIQ314", nombre: "Interpretación de Planos", semestre: 5, requisitos: [] },
  { codigo: "EIQ356", nombre: "Mecánica de Fluidos", semestre: 5, requisitos: ["EIQ311"] },
  { codigo: "EIQ366", nombre: "Métodos Numéricos", semestre: 5, requisitos: [] },
  { codigo: "EIQ377", nombre: "Sistemas Eléctricos", semestre: 5, requisitos: [] },
  { codigo: "ING9003", nombre: "Inglés 3", semestre: 5, requisitos: ["ING9002"] },

  // Continúa agregando todos los demás ramos por semestre...
];

let ramosAprobados = [];

function crearMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  for (let s = 1; s <= 11; s++) {
    const columna = document.createElement("div");
    columna.className = "semestre";

    const titulo = document.createElement("div");
    titulo.className = "semestre-titulo";
    titulo.textContent = `Semestre ${s}`;
    columna.appendChild(titulo);

    ramos.filter(r => r.semestre === s).forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.id = ramo.codigo;
      div.textContent = `${ramo.codigo}\n${ramo.nombre}`;

      if (!puedeDesbloquear(ramo)) {
        div.classList.add("bloqueado");
      }

      div.addEventListener("click", () => toggleRamo(ramo));

      columna.appendChild(div);
    });

    container.appendChild(columna);
  }
}

function puedeDesbloquear(ramo) {
  return ramo.requisitos.every(r => ramosAprobados.includes(r));
}

function toggleRamo(ramo) {
  const div = document.getElementById(ramo.codigo);
  if (div.classList.contains("bloqueado")) return;

  if (ramosAprobados.includes(ramo.codigo)) {
    ramosAprobados = ramosAprobados.filter(r => r !== ramo.codigo);
  } else {
    ramosAprobados.push(ramo.codigo);
  }

  actualizarMalla();
}

function actualizarMalla() {
  document.querySelectorAll(".ramo").forEach(div => {
    const codigo = div.id;
    div.classList.remove("aprobado", "bloqueado");

    if (ramosAprobados.includes(codigo)) {
      div.classList.add("aprobado");
    } else {
      const ramo = ramos.find(r => r.codigo === codigo);
      if (!puedeDesbloquear(ramo)) {
        div.classList.add("bloqueado");
      }
    }
  });
}

crearMalla();
