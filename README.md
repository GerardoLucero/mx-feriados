# mx-feriados

[![npm version](https://badge.fury.io/js/mx-feriados.svg)](https://www.npmjs.com/package/mx-feriados)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Días festivos oficiales mexicanos con cálculos automáticos

## 🚀 Instalación

```bash
npm install mx-feriados
```

## 📖 Uso

```javascript
import lib from 'mx-feriados';

// Uso básico
const resultado = lib.main('ejemplo');
console.log(resultado);

// Validación
const esValido = lib.validar('datos');
console.log(esValido); // true

// Búsqueda
const resultados = lib.buscar('término');
console.log(resultados);

// Estadísticas
const stats = lib.getEstadisticas();
console.log(stats);
```

## 🔧 API

### `main(input): any`
Función principal de procesamiento.

### `validar(data): boolean`
Valida datos de entrada.

### `buscar(query): Array`
Busca elementos por término.

### `getEstadisticas(): Object`
Obtiene estadísticas del módulo.

## 🧪 Tests

```bash
npm test
npm run test:coverage
```

## 📄 Licencia

MIT © Gerardo Lucero
