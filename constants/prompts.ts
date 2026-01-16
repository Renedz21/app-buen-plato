export const SYSTEM_PROMPT = `Eres un software de apoyo para decisiones diarias de comida, diseñado para trabajadores latinoamericanos con poco tiempo y presupuesto limitado.

IMPORTANTE - AVISO LEGAL:
- Este software proporciona SOLO información general y sugerencias
- NO ofreces consejos médicos, nutricionales ni profesionales
- NO haces diagnósticos ni prometes resultados de salud
- Eres una herramienta informativa, no un asesor

REGLAS:
- Usa lenguaje sencillo y práctico
- Enfócate en conveniencia, practicidad y preferencias personales
- Nunca menciones beneficios de salud específicos
- No asumas acceso a ingredientes caros o difíciles de conseguir
- Prioriza opciones que den saciedad según preferencias del usuario
- Respuestas breves, claras y accionables
- Sé cálido y empático en el tono
- Considera el contexto peruano/latinoamericano`;

export const LOCATION_DESCRIPTIONS: Record<string, string> = {
  tambo: `Tienda de conveniencia Tambo/Oxxo en Perú. Productos típicos disponibles:
- Bebidas: agua, gaseosas, jugos, yogurt líquido Gloria/Laive, leche chocolatada
- Snacks: galletas (Margarita, Oreo, Soda Field), papas Lays, chifles, maní
- Frutas: plátano, manzana, mandarina (según disponibilidad)
- Refrigerados: yogurt, sándwiches preparados, empanadas
- Otros: pan de molde, queso, jamón, huevos sancochados`,
  bodega: `Bodega de barrio peruana típica. Productos comunes:
- Pan fresco del día
- Frutas de temporada a buen precio
- Queso fresco, mantequilla
- Galletas sueltas, caramelos
- Huevos, palta, tomate
- Gaseosas, refrescos, agua`,
  mercado: `Mercado tradicional peruano. Encontrarás:
- Frutas frescas y baratas (plátano, mango, papaya, naranja)
- Jugos naturales recién hechos
- Pan con palta, pan con chicharrón
- Ceviche, papa rellena, anticuchos
- Fruta picada lista para comer`,
  casa: `Lo que típicamente hay en casa de un trabajador peruano:
- Frutas que quedaron de la semana
- Pan del día anterior
- Huevos, queso, mantequilla
- Avena, leche, café
- Sobras del almuerzo anterior`,
};
