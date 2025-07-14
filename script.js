document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) return;

    ramo.classList.toggle('aprobado');

    actualizarEstado();
  });
});

function actualizarEstado() {
  const ramos = document.querySelectorAll('.ramo');

  ramos.forEach(ramo => {
    if (ramo.classList.contains('aprobado')) return;

    const requisitos = ramo.dataset.requisitos?.split(',') || [];

    const todosAprobados = requisitos.every(nombre => {
      const req = Array.from(ramos).find(r => r.dataset.nombre === nombre);
      return req && req.classList.contains('aprobado');
    });

    if (requisitos.length === 0 || todosAprobados) {
      ramo.classList.remove('bloqueado');
    } else {
      ramo.classList.add('bloqueado');
    }
  });
}
