const grid = document.getElementById("grid");

const courses = {
  // Primer año - I semestre
  "Contabilidad financiera": [
    "Finanzas de empresas I",
    "Costos",
    "Comercializacion I",
    "Sistemas de informacion I",
    "Administracion de recursos humanos I"
  ],
  "Matematica I": ["Matematica II", "Taller de matematica financiera"],
  "Principios de economia I": [
    "Finanzas de empresas I",
    "Comercializacion I",
    "Contabilidad gerencial",
    "Administracion de operaciones I",
    "Taller de metodologia de la investigacion",
    "Principios de economia II"
  ],

  // Primer año - II semestre
  "Administracion": [
    "Finanzas de empresas I",
    "Comportamiento organizacional",
    "Comercializacion I",
    "Contabilidad gerencial",
    "Sistemas de informacion I"
  ],
  "Matematica II": ["Estadistica"],
  "Derecho empresario I": [
    "Taller de derecho del trabajo y la seguridad social",
    "Derecho societario",
    "Taller de metodologia de la investigacion"
  ],

  // Segundo año - I semestre
  "Costos": ["Formulacion y evaluacion de proyectos", "Contabilidad gerencial"],
  "Sistemas de informacion I": [
    "Organizacion contable de empresas",
    "Administracion de operaciones I",
    "Taller de metodologia de la investigacion",
    "Opciones de practica profesional"
  ],
  "Taller de matematica financiera": ["Finanzas de empresas I"],

  // Segundo año - II semestre
  "Estadistica": [
    "Contabilidad gerencial",
    "Finanzas de empresas I",
    "Administracion de recursos humanos I",
    "Administracion de operaciones I",
    "Estadistica inferencial"
  ],
  "Principios de economia II": [],
  "Derecho societario": ["Taller de legislacion y practica impositiva"],

  // Tercer año - I semestre
  "Comportamiento organizacional": [
    "Direccion estrategica",
    "Administracion de recursos humanos I",
    "Taller de metodologia de la investigacion"
  ],
  "Contabilidad gerencial": [
    "Direccion estrategica",
    "Analisis cuantitativo de negocios",
    "Taller de metodologia de la investigacion",
    "Opciones de practica profesional"
  ],
  "Estadistica inferencial": [
    "Comercializacion II",
    "Finanzas de empresas II",
    "Analisis cuantitativo de negocios",
    "Taller de metodologia de la investigacion"
  ],
  "Taller de legislacion y practica impositiva": [],

  // Tercer año - II semestre
  "Comercializacion I": [
    "Formulacion y evaluacion de proyectos",
    "Direccion estrategica",
    "Comercializacion II",
    "Opciones de practica profesional"
  ],
  "Organizacion contable de empresas": ["Opciones de practica profesional"],
  "Administracion de operaciones I": [
    "Formulacion y evaluacion de proyectos",
    "Administracion de operaciones II",
    "Direccion estrategica",
    "Opciones de practica profesional"
  ],
  "Taller de derecho del trabajo y la seguridad social": ["Administracion de recursos humanos I"],

  // Cuarto año - I semestre
  "Finanzas de empresas I": [
    "Direccion estrategica",
    "Finanzas de empresas II",
    "Opciones de practica profesional"
  ],
  "Comercializacion II": [],
  "Administracion de recursos humanos I": ["Opciones de practica profesional"],
  "Taller de metodologia de la investigacion": ["Opciones de practica profesional"],

  // Cuarto año - II semestre
  "Finanzas de empresas II": [],
  "Administracion de operaciones II": [],
  "Optativa I": [],

  // Quinto año - I semestre
  "Formulacion y evaluacion de proyectos": [],
  "Analisis cuantitativo de negocios": [],
  "Optativa II": [],
  "Optativa III": [],

  // Quinto año - II semestre
  "Direccion estrategica": [],
  "Opciones de practica profesional": [],
  "Optativa IV": []
};

const completed = new Set();
const courseElements = {};

function createCourse(name) {
  const div = document.createElement("div");
  div.className = "course locked";
  div.textContent = name;
  div.dataset.name = name;
  div.addEventListener("click", () => toggleCourse(name));
  grid.appendChild(div);
  courseElements[name] = div;
}

function toggleCourse(name) {
  if (!courseElements[name] || courseElements[name].classList.contains("locked")) return;
  if (completed.has(name)) {
    completed.delete(name);
    courseElements[name].classList.remove("completed");
    updateLocks();
  } else {
    completed.add(name);
    courseElements[name].classList.add("completed");
    updateLocks();
  }
}

function updateLocks() {
  Object.keys(courseElements).forEach((course) => {
    const prerequisites = Object.entries(courses)
      .filter(([_, unlocks]) => unlocks.includes(course))
      .map(([prereq]) => prereq);
    const isUnlocked = prerequisites.every(pr => completed.has(pr));
    courseElements[course].classList.toggle("locked", !isUnlocked);
  });
}

Object.keys(courses).forEach((course) => createCourse(course));
updateLocks();

