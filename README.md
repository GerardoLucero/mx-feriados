# mx-feriados

<!-- BADGES-DONATIONS-START -->
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Donate-orange?logo=ko-fi)](https://ko-fi.com/gerardolucero)
[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support-yellow?logo=buy-me-a-coffee)](https://buymeacoffee.com/lucerorios0)
<!-- BADGES-DONATIONS-END -->


[![npm version](https://badge.fury.io/js/mx-feriados.svg)](https://badge.fury.io/js/mx-feriados)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Librería completa para el manejo de días festivos oficiales mexicanos con cálculo automático de fechas móviles.

## Instalación

```bash
npm install mx-feriados
```

## Uso

```javascript
import { getFeriados, esFeriado, calcularDiasHabiles } from 'mx-feriados';

// Obtener feriados del año
const feriados2024 = getFeriados(2024);

// Verificar si una fecha es feriado
const esFeriadoHoy = esFeriado(new Date());

// Calcular días hábiles entre fechas
const diasHabiles = calcularDiasHabiles('2024-01-01', '2024-01-31');
```

## API

### `getFeriados(año)`
Retorna todos los feriados del año especificado.

### `esFeriado(fecha)`
Verifica si una fecha es día festivo oficial.

### `calcularDiasHabiles(fechaInicio, fechaFin)`
Calcula días hábiles excluyendo feriados y fines de semana.

### `calcularSemanaSanta(año)`
Calcula fechas de Semana Santa (Jueves y Viernes Santo).

## Características

- ✅ Feriados fijos y móviles
- ✅ Cálculo automático de Semana Santa
- ✅ Días hábiles y laborales
- ✅ Feriados oficiales y opcionales
- ✅ Soporte para cualquier año

## Licencia

MIT © Gerardo Lucero

<!-- DONATIONS-START -->
## 💖 Apoya el Ecosistema Mexicano OSS

Si estos paquetes te ayudan (RFC, ISR, Nómina, Bancos, Feriados, Nombres, Códigos Postales, Validadores), considera invitarme un café o apoyar el mantenimiento:

- [Ko-fi](https://ko-fi.com/gerardolucero)
- [Buy Me a Coffee](https://buymeacoffee.com/lucerorios0)

> Gracias por tu apoyo 🙌. Priorizaré issues/PRs con **contexto de uso en México** (SAT/IMSS/INFONAVIT, bancos, feriados) y publicaré avances en los READMEs.
<!-- DONATIONS-END -->
