---
description: "Esta regla proporciona código listo para producción, claro y mantenible, aplicando simplicidad, clean code y optimización pragmática sin sobreingeniería ni complejidad innecesaria."
alwaysApply: true
---

**Reglas profesionales para generación de código en Cursor**

1. **Adecuación al problema**
   - Implementa únicamente la lógica necesaria para resolver el caso planteado.
   - Evita abstracciones, patrones o capas adicionales si no aportan valor inmediato.
   - Prioriza soluciones directas y legibles frente a soluciones “elegantes” pero innecesarias.

2. **No sobreingeniería**
   - No introduzcas arquitecturas complejas, patrones avanzados o genéricos prematuros.
   - No prepares el código para “casos futuros” que no hayan sido solicitados explícitamente.
   - Prefiere refactorizar cuando el problema crezca, no antes.

3. **Clean Code como base**
   - Aplica DRY solo cuando exista duplicación real y clara.
   - Aplica KISS como principio dominante: si algo puede hacerse más simple, hazlo.
   - Usa nombres descriptivos, coherentes y consistentes para variables, funciones y archivos.
   - Mantén funciones pequeñas y con una sola responsabilidad.

4. **Claridad antes que optimización**
   - Optimiza solo cuando el costo sea bajo y el beneficio claro.
   - No sacrifiques legibilidad por micro-optimizaciones irrelevantes.
   - Si una optimización no es evidente, documenta brevemente el porqué.

5. **Uso responsable de herramientas**
   - Utiliza herramientas MCP cuando simplifiquen el código o reduzcan boilerplate.
   - No dependas de herramientas externas si una solución nativa es suficiente y clara.
   - Integra herramientas de forma explícita y comprensible, sin “magia oculta”.

6. **Consistencia con el stack**
   - Respeta las convenciones del framework y del lenguaje utilizado.
   - No mezcles estilos, paradigmas o enfoques contradictorios en el mismo proyecto.

7. **Código listo para producción**
   - El código entregado debe ser directamente usable, no pseudocódigo.
   - Evita comentarios obvios; comenta solo decisiones no evidentes.
   - Maneja errores de forma simple y explícita cuando sea relevante.

8. **Comunicación implícita en el código**
   - El código debe explicarse por sí mismo sin necesidad de justificaciones extensas.
   - Si algo requiere demasiada explicación, probablemente está mal diseñado.

Estas reglas deben guiar siempre la generación de código, incluso si eso implica decir “esto no necesita más complejidad”.
