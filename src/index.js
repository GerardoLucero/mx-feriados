/**
 * Librería de días feriados mexicanos
 * Incluye feriados oficiales, cívicos y opcionales
 */

// Feriados fijos anuales
const FERIADOS_FIJOS = [
  { mes: 1, dia: 1, nombre: 'Año Nuevo', tipo: 'oficial', obligatorio: true },
  { mes: 2, dia: 5, nombre: 'Día de la Constitución', tipo: 'oficial', obligatorio: true },
  { mes: 3, dia: 21, nombre: 'Natalicio de Benito Juárez', tipo: 'oficial', obligatorio: true },
  { mes: 5, dia: 1, nombre: 'Día del Trabajo', tipo: 'oficial', obligatorio: true },
  { mes: 9, dia: 16, nombre: 'Día de la Independencia', tipo: 'oficial', obligatorio: true },
  { mes: 11, dia: 20, nombre: 'Día de la Revolución Mexicana', tipo: 'oficial', obligatorio: true },
  { mes: 12, dia: 25, nombre: 'Navidad', tipo: 'oficial', obligatorio: true },
  
  // Feriados opcionales
  { mes: 1, dia: 6, nombre: 'Día de los Reyes Magos', tipo: 'opcional', obligatorio: false },
  { mes: 2, dia: 14, nombre: 'Día del Amor y la Amistad', tipo: 'opcional', obligatorio: false },
  { mes: 3, dia: 8, nombre: 'Día Internacional de la Mujer', tipo: 'opcional', obligatorio: false },
  { mes: 4, dia: 30, nombre: 'Día del Niño', tipo: 'opcional', obligatorio: false },
  { mes: 5, dia: 10, nombre: 'Día de las Madres', tipo: 'opcional', obligatorio: false },
  { mes: 5, dia: 15, nombre: 'Día del Maestro', tipo: 'opcional', obligatorio: false },
  { mes: 9, dia: 15, nombre: 'Grito de Independencia', tipo: 'opcional', obligatorio: false },
  { mes: 10, dia: 12, nombre: 'Día de la Raza', tipo: 'opcional', obligatorio: false },
  { mes: 11, dia: 1, nombre: 'Día de Todos los Santos', tipo: 'opcional', obligatorio: false },
  { mes: 11, dia: 2, nombre: 'Día de los Muertos', tipo: 'opcional', obligatorio: false },
  { mes: 12, dia: 12, nombre: 'Día de la Virgen de Guadalupe', tipo: 'opcional', obligatorio: false },
  { mes: 12, dia: 24, nombre: 'Nochebuena', tipo: 'opcional', obligatorio: false },
  { mes: 12, dia: 31, nombre: 'Fin de Año', tipo: 'opcional', obligatorio: false }
];

// Reglas para feriados móviles (lunes más cercano)
const FERIADOS_MOVILES = [
  { mes: 2, dia: 5, nombre: 'Día de la Constitución' },
  { mes: 3, dia: 21, nombre: 'Natalicio de Benito Juárez' },
  { mes: 11, dia: 20, nombre: 'Día de la Revolución Mexicana' }
];

/**
 * Calcula la fecha de Semana Santa para un año dado
 * @param {number} año - Año para calcular
 * @returns {Object} Fechas de Semana Santa
 */
function calcularSemanaSanta(año) {
  // Algoritmo para calcular el Domingo de Pascua
  const a = año % 19;
  const b = Math.floor(año / 100);
  const c = año % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = Math.floor((h + l - 7 * m + 114) / 31);
  const p = (h + l - 7 * m + 114) % 31;
  
  const domingoPascua = new Date(año, n - 1, p + 1);
  
  // Calcular fechas de Semana Santa
  const juevesSanto = new Date(domingoPascua);
  juevesSanto.setDate(domingoPascua.getDate() - 3);
  
  const viernesSanto = new Date(domingoPascua);
  viernesSanto.setDate(domingoPascua.getDate() - 2);
  
  const sabadoGloria = new Date(domingoPascua);
  sabadoGloria.setDate(domingoPascua.getDate() - 1);
  
  return {
    juevesSanto: {
      fecha: juevesSanto,
      nombre: 'Jueves Santo',
      tipo: 'religioso',
      obligatorio: false
    },
    viernesSanto: {
      fecha: viernesSanto,
      nombre: 'Viernes Santo',
      tipo: 'religioso',
      obligatorio: false
    },
    sabadoGloria: {
      fecha: sabadoGloria,
      nombre: 'Sábado de Gloria',
      tipo: 'religioso',
      obligatorio: false
    },
    domingoPascua: {
      fecha: domingoPascua,
      nombre: 'Domingo de Pascua',
      tipo: 'religioso',
      obligatorio: false
    }
  };
}

/**
 * Calcula si un feriado debe moverse al lunes más cercano
 * @param {Date} fecha - Fecha original del feriado
 * @returns {Date} Fecha ajustada
 */
function calcularLunesObservado(fecha) {
  const diaSemana = fecha.getDay();
  const fechaObservada = new Date(fecha);
  
  // Si cae en sábado (6), mover al lunes siguiente
  if (diaSemana === 6) {
    fechaObservada.setDate(fecha.getDate() + 2);
  }
  // Si cae en domingo (0), mover al lunes siguiente
  else if (diaSemana === 0) {
    fechaObservada.setDate(fecha.getDate() + 1);
  }
  
  return fechaObservada;
}

/**
 * Obtiene todos los feriados para un año específico
 * @param {number} año - Año a consultar
 * @param {Object} opciones - Opciones de filtrado
 * @returns {Array} Lista de feriados
 */
export function getFeriados(año = new Date().getFullYear(), opciones = {}) {
  const { incluirOpcionales = false, incluirReligiosos = false, aplicarLeyFederal = true } = opciones;
  
  const feriados = [];
  
  // Agregar feriados fijos
  FERIADOS_FIJOS.forEach(feriado => {
    if (!incluirOpcionales && !feriado.obligatorio) return;
    
    let fecha = new Date(año, feriado.mes - 1, feriado.dia);
    let fechaObservada = fecha;
    
    // Aplicar regla de lunes más cercano para feriados específicos
    if (aplicarLeyFederal) {
      const esMovible = FERIADOS_MOVILES.some(m => 
        m.mes === feriado.mes && m.dia === feriado.dia
      );
      if (esMovible) {
        fechaObservada = calcularLunesObservado(fecha);
      }
    }
    
    feriados.push({
      fecha: fecha,
      fechaObservada: fechaObservada,
      nombre: feriado.nombre,
      tipo: feriado.tipo,
      obligatorio: feriado.obligatorio,
      esMovido: fecha.getTime() !== fechaObservada.getTime()
    });
  });
  
  // Agregar Semana Santa si se incluyen religiosos
  if (incluirReligiosos) {
    const semanaSanta = calcularSemanaSanta(año);
    Object.values(semanaSanta).forEach(festividad => {
      feriados.push({
        fecha: festividad.fecha,
        fechaObservada: festividad.fecha,
        nombre: festividad.nombre,
        tipo: festividad.tipo,
        obligatorio: festividad.obligatorio,
        esMovido: false
      });
    });
  }
  
  // Ordenar por fecha
  feriados.sort((a, b) => a.fechaObservada - b.fechaObservada);
  
  return feriados;
}

/**
 * Verifica si una fecha es feriado
 * @param {Date|string} fecha - Fecha a verificar
 * @param {Object} opciones - Opciones de verificación
 * @returns {Object|null} Información del feriado o null
 */
export function esFeriado(fecha, opciones = {}) {
  const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (!(fechaObj instanceof Date) || isNaN(fechaObj)) {
    throw new Error('Fecha inválida');
  }
  
  const año = fechaObj.getFullYear();
  const feriados = getFeriados(año, opciones);
  
  const feriadoEncontrado = feriados.find(feriado => {
    const fechaComparar = opciones.usarFechaObservada !== false ? 
      feriado.fechaObservada : feriado.fecha;
    return fechaComparar.toDateString() === fechaObj.toDateString();
  });
  
  return feriadoEncontrado || null;
}

/**
 * Obtiene el siguiente feriado a partir de una fecha
 * @param {Date|string} fecha - Fecha de referencia
 * @param {Object} opciones - Opciones de búsqueda
 * @returns {Object|null} Próximo feriado
 */
export function siguienteFeriado(fecha = new Date(), opciones = {}) {
  const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (!(fechaObj instanceof Date) || isNaN(fechaObj)) {
    throw new Error('Fecha inválida');
  }
  
  const año = fechaObj.getFullYear();
  let feriados = getFeriados(año, opciones);
  
  // Buscar en el año actual
  let proximoFeriado = feriados.find(feriado => {
    const fechaComparar = opciones.usarFechaObservada !== false ? 
      feriado.fechaObservada : feriado.fecha;
    return fechaComparar > fechaObj;
  });
  
  // Si no hay más feriados este año, buscar en el siguiente
  if (!proximoFeriado) {
    feriados = getFeriados(año + 1, opciones);
    proximoFeriado = feriados[0];
  }
  
  if (proximoFeriado) {
    const fechaFeriado = opciones.usarFechaObservada !== false ? 
      proximoFeriado.fechaObservada : proximoFeriado.fecha;
    const diasRestantes = Math.ceil((fechaFeriado - fechaObj) / (1000 * 60 * 60 * 24));
    
    return {
      ...proximoFeriado,
      diasRestantes
    };
  }
  
  return null;
}

/**
 * Calcula días hábiles entre dos fechas (excluyendo feriados y fines de semana)
 * @param {Date|string} fechaInicio - Fecha de inicio
 * @param {Date|string} fechaFin - Fecha de fin
 * @param {Object} opciones - Opciones de cálculo
 * @returns {Object} Información de días hábiles
 */
export function calcularDiasHabiles(fechaInicio, fechaFin, opciones = {}) {
  const inicio = typeof fechaInicio === 'string' ? new Date(fechaInicio) : fechaInicio;
  const fin = typeof fechaFin === 'string' ? new Date(fechaFin) : fechaFin;
  
  if (!(inicio instanceof Date) || !(fin instanceof Date) || isNaN(inicio) || isNaN(fin)) {
    throw new Error('Fechas inválidas');
  }
  
  if (inicio > fin) {
    throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
  }
  
  const { incluirFeriados = false, incluirSabados = false } = opciones;
  
  let diasHabiles = 0;
  let diasFeriados = 0;
  let diasFinSemana = 0;
  const fechaActual = new Date(inicio);
  
  // Obtener feriados para el rango de años
  const añoInicio = inicio.getFullYear();
  const añoFin = fin.getFullYear();
  let todosLosFeriados = [];
  
  for (let año = añoInicio; año <= añoFin; año++) {
    todosLosFeriados = todosLosFeriados.concat(getFeriados(año, opciones));
  }
  
  while (fechaActual <= fin) {
    const diaSemana = fechaActual.getDay();
    const esSabado = diaSemana === 6;
    const esDomingo = diaSemana === 0;
    const esFeriadoHoy = esFeriado(fechaActual, opciones);
    
    if (esFeriadoHoy && !incluirFeriados) {
      diasFeriados++;
    } else if (esDomingo || (esSabado && !incluirSabados)) {
      diasFinSemana++;
    } else {
      diasHabiles++;
    }
    
    fechaActual.setDate(fechaActual.getDate() + 1);
  }
  
  return {
    diasHabiles,
    diasFeriados,
    diasFinSemana,
    diasTotales: diasHabiles + diasFeriados + diasFinSemana,
    fechaInicio: inicio,
    fechaFin: fin
  };
}

/**
 * Obtiene feriados por tipo
 * @param {number} año - Año a consultar
 * @param {string} tipo - Tipo de feriado ('oficial', 'opcional', 'religioso')
 * @returns {Array} Feriados del tipo especificado
 */
export function getFeriadosPorTipo(año = new Date().getFullYear(), tipo) {
  if (!tipo) {
    throw new Error('Debe especificar un tipo de feriado');
  }
  
  const todosLosFeriados = getFeriados(año, { 
    incluirOpcionales: true, 
    incluirReligiosos: true 
  });
  
  return todosLosFeriados.filter(feriado => feriado.tipo === tipo);
}

/**
 * Obtiene estadísticas de feriados para un año
 * @param {number} año - Año a analizar
 * @returns {Object} Estadísticas de feriados
 */
export function getEstadisticasFeriados(año = new Date().getFullYear()) {
  const oficiales = getFeriadosPorTipo(año, 'oficial');
  const opcionales = getFeriadosPorTipo(año, 'opcional');
  const religiosos = getFeriadosPorTipo(año, 'religioso');
  
  return {
    año,
    total: oficiales.length + opcionales.length + religiosos.length,
    oficiales: oficiales.length,
    opcionales: opcionales.length,
    religiosos: religiosos.length,
    feriadosMovidos: oficiales.filter(f => f.esMovido).length,
    feriadosPorMes: generarFeriadosPorMes(año)
  };
}

/**
 * Genera distribución de feriados por mes
 * @param {number} año - Año a analizar
 * @returns {Object} Feriados por mes
 */
function generarFeriadosPorMes(año) {
  const feriados = getFeriados(año, { incluirOpcionales: true, incluirReligiosos: true });
  const feriadosPorMes = {};
  
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  
  meses.forEach((mes, index) => {
    feriadosPorMes[mes] = feriados.filter(f => 
      f.fechaObservada.getMonth() === index
    ).length;
  });
  
  return feriadosPorMes;
}

export default {
  getFeriados,
  esFeriado,
  siguienteFeriado,
  calcularDiasHabiles,
  getFeriadosPorTipo,
  getEstadisticasFeriados
};
