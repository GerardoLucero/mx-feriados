# mx-feriados

Librería completa para el manejo de días festivos oficiales mexicanos con cálculo automático de fechas móviles y días hábiles.

[![Ko-fi](https://img.shields.io/badge/Ko--fi-FF5E5B?style=flat&logo=ko-fi&logoColor=white)](https://ko-fi.com/gerardolucero)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/lucerorios0)
[![GitHub Stars](https://img.shields.io/github/stars/GerardoLucero/mx-feriados?style=social)](https://github.com/GerardoLucero/mx-feriados)
[![npm version](https://badge.fury.io/js/mx-feriados.svg)](https://badge.fury.io/js/mx-feriados)
[![npm downloads](https://img.shields.io/npm/dm/mx-feriados.svg)](https://www.npmjs.com/package/mx-feriados)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Feriados oficiales mexicanos** según la Ley Federal del Trabajo
- **Cálculo automático** de fechas móviles (lunes más cercano)
- **Semana Santa** calculada automáticamente por año
- **Días hábiles** entre fechas excluyendo feriados
- **Clasificación** por tipos (oficial, opcional, religioso)
- **Detección** si una fecha es feriado
- **Estadísticas** de feriados por año

## Instalación

```bash
npm install mx-feriados
```

## Uso básico

```javascript
import feriados from 'mx-feriados';

// Obtener todos los feriados del año actual
const feriadosActuales = feriados.getFeriados();
console.log(feriadosActuales);

// Obtener feriados de un año específico
const feriados2024 = feriados.getFeriados(2024);
console.log(feriados2024);

// Verificar si una fecha es feriado
const esAnoNuevo = feriados.esFeriado(new Date(2024, 0, 1)); // 1 enero 2024
console.log(esAnoNuevo); // { nombre: 'Año Nuevo', tipo: 'oficial', ... }

const diaComun = feriados.esFeriado(new Date(2024, 0, 2)); // 2 enero 2024
console.log(diaComun); // null
```

## API

### `getFeriados(año?, opciones?)`

Obtiene la lista completa de feriados para un año.

**Parámetros:**
- `año` (number, opcional): Año a consultar. Por defecto: año actual
- `opciones` (object, opcional):
  - `incluirOpcionales` (boolean): Incluir feriados opcionales. Por defecto: `false`
  - `incluirReligiosos` (boolean): Incluir feriados religiosos. Por defecto: `false`
  - `aplicarLunesObservado` (boolean): Aplicar regla del lunes observado. Por defecto: `true`

```javascript
const feriados = feriados.getFeriados(2024, {
  incluirOpcionales: true,
  incluirReligiosos: true
});

// Cada feriado contiene:
// {
//   nombre: 'Día de la Independencia',
//   fecha: Date,           // Fecha original
//   fechaObservada: Date,  // Fecha observada (con lunes si aplica)
//   tipo: 'oficial',       // 'oficial', 'opcional', 'religioso'
//   obligatorio: true,     // Si es día de descanso obligatorio
//   descripcion: '...'     // Descripción del feriado
// }
```

### `esFeriado(fecha)`

Verifica si una fecha específica es feriado. Retorna objeto con información del feriado o `null`.

### `siguienteFeriado(fechaDesde?)`

Encuentra el siguiente feriado a partir de una fecha.

### `calcularDiasHabiles(fechaInicio, fechaFin, opciones?)`

Calcula días hábiles entre dos fechas, excluyendo fines de semana y feriados.

```javascript
const inicio = new Date(2024, 0, 1);  // 1 enero 2024
const fin = new Date(2024, 0, 31);    // 31 enero 2024

const resultado = feriados.calcularDiasHabiles(inicio, fin);
console.log(`Días hábiles: ${resultado.diasHabiles}`);
console.log(`Feriados encontrados: ${resultado.feriadosEncontrados.length}`);
```

### `getFeriadosPorTipo(año?, tipo)`

Obtiene feriados filtrados por tipo (`'oficial'`, `'opcional'`, `'religioso'`).

### `getEstadisticasFeriados(año?)`

Genera estadísticas completas de feriados para un año.

## Tipos de feriados

### Oficiales (Ley Federal del Trabajo)
- Año Nuevo (1 enero)
- Día de la Constitución (5 febrero — lunes observado)
- Natalicio de Benito Juárez (21 marzo — lunes observado)
- Día del Trabajo (1 mayo)
- Día de la Independencia (16 septiembre)
- Día de la Revolución Mexicana (20 noviembre — lunes observado)
- Navidad (25 diciembre)

### Religiosos (Semana Santa)
- Jueves Santo
- Viernes Santo
- Domingo de Resurrección

### Opcionales (Conmemorativos)
- Día de Reyes, Día de la Mujer, Día de las Madres, etc.

## Cálculo de Semana Santa

La librería calcula automáticamente las fechas de Semana Santa usando el algoritmo astronómico oficial:

```javascript
const feriados2024 = feriados.getFeriados(2024, { incluirReligiosos: true });
const semanaSanta = feriados2024.filter(f => f.tipo === 'religioso');
console.log(semanaSanta);
```

## Ejemplos avanzados

### Calendario de días laborables

```javascript
function esLaboral(fecha) {
  const feriado = feriados.esFeriado(fecha);
  const esFinDeSemana = fecha.getDay() === 0 || fecha.getDay() === 6;
  return !feriado && !esFinDeSemana;
}
```

### Planificación de puentes

```javascript
function planificarVacaciones(año) {
  const feriadosOficiales = feriados.getFeriadosPorTipo(año, 'oficial');
  const puentesPosibles = [];

  feriadosOficiales.forEach(feriado => {
    const fecha = feriado.fechaObservada;
    const diaSemana = fecha.getDay();

    if (diaSemana === 2 || diaSemana === 4) {
      puentesPosibles.push({
        feriado: feriado.nombre,
        fecha,
        sugerencia: diaSemana === 2 ? 'Tomar lunes libre' : 'Tomar viernes libre'
      });
    }
  });

  return puentesPosibles;
}
```

## Desarrollo

```bash
npm install
npm test
npm run test:coverage
npm run lint
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

MIT © [Gerardo Lucero](https://github.com/GerardoLucero)
