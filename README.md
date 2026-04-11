# mx-feriados

[![npm version](https://badge.fury.io/js/mx-feriados.svg)](https://badge.fury.io/js/mx-feriados)
[![npm downloads](https://img.shields.io/npm/dm/mx-feriados.svg)](https://www.npmjs.com/package/mx-feriados)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Librería completa para el manejo de días festivos oficiales mexicanos con cálculo automático de fechas móviles y días hábiles.

## Características

- 📅 **Feriados oficiales mexicanos** según la Ley Federal del Trabajo
- 🔄 **Cálculo automático** de fechas móviles (lunes más cercano)
- ⛪ **Semana Santa** calculada automáticamente por año
- 📊 **Días hábiles** entre fechas excluyendo feriados
- 🏷️ **Clasificación** por tipos (oficial, opcional, religioso)
- 🔍 **Detección** si una fecha es feriado
- 📈 **Estadísticas** de feriados por año

## Instalación

```bash
npm install mx-feriados
```

## Uso Básico

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

## API Completa

### `getFeriados(año?, opciones?)`

Obtiene la lista completa de feriados para un año.

**Parámetros:**
- `año` (number, opcional): Año a consultar. Por defecto: año actual
- `opciones` (object, opcional): Opciones de configuración
  - `incluirOpcionales` (boolean): Incluir feriados opcionales. Por defecto: `false`
  - `incluirReligiosos` (boolean): Incluir feriados religiosos. Por defecto: `false`
  - `aplicarLunesObservado` (boolean): Aplicar regla del lunes observado. Por defecto: `true`

**Retorna:** Array de objetos con información de feriados

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

Verifica si una fecha específica es feriado.

**Parámetros:**
- `fecha` (Date): Fecha a verificar

**Retorna:** Objeto con información del feriado o `null` si no es feriado

```javascript
const fecha = new Date(2024, 8, 16); // 16 septiembre 2024
const resultado = feriados.esFeriado(fecha);

if (resultado) {
  console.log(`Es feriado: ${resultado.nombre}`);
  console.log(`Tipo: ${resultado.tipo}`);
  console.log(`Obligatorio: ${resultado.obligatorio}`);
}
```

### `siguienteFeriado(fechaDesde?)`

Encuentra el siguiente feriado a partir de una fecha.

**Parámetros:**
- `fechaDesde` (Date, opcional): Fecha de inicio. Por defecto: fecha actual

**Retorna:** Objeto con información del siguiente feriado

```javascript
const siguiente = feriados.siguienteFeriado(new Date(2024, 0, 15));
console.log(`Próximo feriado: ${siguiente.nombre}`);
console.log(`Fecha: ${siguiente.fechaObservada.toLocaleDateString()}`);
```

### `calcularDiasHabiles(fechaInicio, fechaFin, opciones?)`

Calcula días hábiles entre dos fechas, excluyendo fines de semana y feriados.

**Parámetros:**
- `fechaInicio` (Date): Fecha de inicio
- `fechaFin` (Date): Fecha de fin
- `opciones` (object, opcional): Opciones de cálculo
  - `incluirFeriados` (boolean): Si incluir feriados como días hábiles. Por defecto: `false`
  - `incluirSabados` (boolean): Si incluir sábados. Por defecto: `false`

**Retorna:** Objeto con información del cálculo

```javascript
const inicio = new Date(2024, 0, 1);  // 1 enero 2024
const fin = new Date(2024, 0, 31);    // 31 enero 2024

const resultado = feriados.calcularDiasHabiles(inicio, fin);
console.log(`Días hábiles: ${resultado.diasHabiles}`);
console.log(`Días totales: ${resultado.diasTotales}`);
console.log(`Fines de semana: ${resultado.finesDeSemana}`);
console.log(`Feriados encontrados: ${resultado.feriadosEncontrados.length}`);
```

### `getFeriadosPorTipo(año?, tipo)`

Obtiene feriados filtrados por tipo.

**Parámetros:**
- `año` (number, opcional): Año a consultar. Por defecto: año actual
- `tipo` (string): Tipo de feriado ('oficial', 'opcional', 'religioso')

**Retorna:** Array de feriados del tipo especificado

```javascript
const feriadosOficiales = feriados.getFeriadosPorTipo(2024, 'oficial');
const feriadosOpcionales = feriados.getFeriadosPorTipo(2024, 'opcional');
const feriadosReligiosos = feriados.getFeriadosPorTipo(2024, 'religioso');
```

### `getEstadisticasFeriados(año?)`

Genera estadísticas completas de feriados para un año.

**Parámetros:**
- `año` (number, opcional): Año a analizar. Por defecto: año actual

**Retorna:** Objeto con estadísticas detalladas

```javascript
const stats = feriados.getEstadisticasFeriados(2024);
console.log(stats);

// Retorna:
// {
//   año: 2024,
//   total: 15,
//   oficiales: 7,
//   opcionales: 8,
//   religiosos: 4,
//   obligatorios: 7,
//   porMes: {
//     enero: 2,
//     febrero: 1,
//     // ...
//   },
//   proximoFeriado: { ... },
//   diasHastaProximo: 45
// }
```

## Tipos de Feriados

### Oficiales (Ley Federal del Trabajo)
- Año Nuevo (1 enero)
- Día de la Constitución (5 febrero - lunes observado)
- Natalicio de Benito Juárez (21 marzo - lunes observado)
- Día del Trabajo (1 mayo)
- Día de la Independencia (16 septiembre)
- Día de la Revolución Mexicana (20 noviembre - lunes observado)
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

## Opciones de Configuración

```javascript
// Configuración completa
const opciones = {
  incluirOpcionales: true,     // Incluir feriados conmemorativos
  incluirReligiosos: true,     // Incluir Semana Santa
  aplicarLunesObservado: true  // Aplicar regla del lunes observado
};

const feriadosCompletos = feriados.getFeriados(2024, opciones);
```

## Ejemplos Avanzados

### Calendario de días laborables
```javascript
function esLaboral(fecha) {
  const feriado = feriados.esFeriado(fecha);
  const esFinDeSemana = fecha.getDay() === 0 || fecha.getDay() === 6;
  
  return !feriado && !esFinDeSemana;
}

const hoy = new Date();
console.log(`Hoy es laboral: ${esLaboral(hoy)}`);
```

### Planificación de vacaciones
```javascript
function planificarVacaciones(año) {
  const feriadosOficiales = feriados.getFeriadosPorTipo(año, 'oficial');
  const puentesPosibles = [];
  
  feriadosOficiales.forEach(feriado => {
    const fecha = feriado.fechaObservada;
    const diaSemana = fecha.getDay();
    
    if (diaSemana === 2 || diaSemana === 4) { // Martes o Jueves
      puentesPosibles.push({
        feriado: feriado.nombre,
        fecha: fecha,
        sugerencia: diaSemana === 2 ? 'Tomar lunes libre' : 'Tomar viernes libre'
      });
    }
  });
  
  return puentesPosibles;
}

const puentes2024 = planificarVacaciones(2024);
console.log('Oportunidades de puentes:', puentes2024);
```

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Coverage
npm run test:coverage

# Linting
npm run lint
```

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

MIT © [Gerardo Lucero](https://github.com/GerardoLucero)

## Soporte

- [Issues](https://github.com/GerardoLucero/mx-feriados/issues)
- [Documentación](https://github.com/GerardoLucero/mx-feriados#readme)
