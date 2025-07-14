// Estructura de ramos con requisitos
const ramos = [
  { codigo: "EIQ110", nombre: "Fundamentos de Procesos Químicos", semestre: 1, requisitos: [] },
  { codigo: "EIQ120", nombre: "Fundamentos de Ingeniería", semestre: 2, requisitos: ["EIQ110"] },
  { codigo: "EIQ220", nombre: "Balances de Materia", semestre: 3, requisitos: ["EIQ120"] },
  { codigo: "EIQ242", nombre: "Elementos de Fisicoquímica", semestre: 4, requisitos: ["EIQ220"] },
  { codigo: "EIQ311", nombre: "Termodinámica de Procesos", semestre: 5, requisitos: ["EIQ242"] },
  { codigo: "EIQ359", nombre: "Termodinámica del Equilibrio", semestre: 5, requisitos: ["EIQ311"] },
  { codigo: "EIQ356", nombre: "Mecánica de Fluidos", semestre: 5, requisitos: ["EIQ311"] },
  { codigo: "EIQ453", nombre: "Transferencia de Calor", semestre: 7, requisitos: ["EIQ359", "EIQ356"] },
  { codigo: "EIQ474", nombre: "Reactores Químicos 1", semestre: 8, requisitos: ["EIQ453"] },
  { codigo: "EIQ536", nombre: "Reactores Químicos 2", semestre: 9, requisitos: ["EIQ474"] },
  { codigo: "EIQ625", nombre: "Proyecto de Título 2", semestre: 11, requisitos: ["EIQ582"] },
  { codigo: "EIQ582", nombre: "Proyecto de Título 1", semestre: 10, requisitos: ["EIQ518"] },
  { codigo: "EIQ518", nombre: "Diseño de Equipos", semestre: 9, requisitos: ["EIQ474"] },
  // Agrega todos los demás ramos siguiendo la misma estructura...
];

let ramosAprobados = [];

function crearMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  for (let s = 1; s <= 11; s++) {
    const titulo = document.createElement("div");
    titulo.className = "semestre";
    titulo.textContent = `Semestre ${s}`;
    container.appendChild(titulo);

    ramos.filter(r => r.semestre === s).forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.id = ramo.codigo;
      div.textContent = `${ramo.codigo}\n${ramo.nombre}`;

      if (!puedeDesbloquear(ramo)) {
        div.classList.add("bloqueado");
      }

      div.addEventListener("click", () => toggleRamo(ramo));

      container.appendChild(div);
    });
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
