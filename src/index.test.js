import lib from './index.js';

describe('mx-feriados', () => {
  describe('main', () => {
    test('debe procesar entrada válida', () => {
      const resultado = lib.main('test');
      expect(resultado).toBeTruthy();
      expect(resultado.input).toBe('test');
      expect(resultado.procesado).toBe(true);
    });

    test('debe manejar entrada nula', () => {
      const resultado = lib.main(null);
      expect(resultado).toBeNull();
    });
  });

  describe('validar', () => {
    test('debe validar datos válidos', () => {
      expect(lib.validar('test')).toBe(true);
      expect(lib.validar(123)).toBe(true);
      expect(lib.validar({})).toBe(true);
    });

    test('debe rechazar datos inválidos', () => {
      expect(lib.validar(null)).toBe(false);
      expect(lib.validar(undefined)).toBe(false);
      expect(lib.validar('')).toBe(false);
    });
  });

  describe('buscar', () => {
    test('debe retornar resultados para query válida', () => {
      const resultados = lib.buscar('test');
      expect(Array.isArray(resultados)).toBe(true);
      expect(resultados.length).toBeGreaterThan(0);
      expect(resultados[0]).toHaveProperty('id');
      expect(resultados[0]).toHaveProperty('nombre');
    });

    test('debe retornar array vacío para query inválida', () => {
      expect(lib.buscar(null)).toEqual([]);
      expect(lib.buscar('')).toEqual([]);
    });
  });

  describe('getEstadisticas', () => {
    test('debe retornar estadísticas válidas', () => {
      const stats = lib.getEstadisticas();
      expect(stats).toHaveProperty('version');
      expect(stats).toHaveProperty('ultimaActualizacion');
      expect(stats).toHaveProperty('funciones');
      expect(Array.isArray(stats.funciones)).toBe(true);
    });
  });
});
