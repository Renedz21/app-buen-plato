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
  tambo: `
Tienda de conveniencia Tambo (y formatos similares como Oxxo o Listo) en Perú. Productos típicos disponibles incluyen:
- Bebidas frías y calientes: agua embotellada, gaseosas (Coca-Cola, Inca Kola), jugos en botella, bebidas energéticas, café listo para llevar.
- Snacks empaquetados: papas fritas (Inka Chips, Lays), chifles, maní salado, galletas dulces o saladas, frutos secos, etc.
- Comidas rápidas y preparadas listas para consumir: hamburguesas o combos (pan con carne, queso, salsas), empanadas, packs de comida preparada comercial, etc.
- Refrigerados y lácteos empaquetados: yogures bebibles o tradicionales, leche UHT, postres fríos empaquetados, etc.
- Otros productos básicos de conveniencia: helados empaquetados, dulces, chocolatinas, bebidas alcohólicas (requieren edad), hielo y combos promocionales, etc.
- Suelen tener alimentos muy prácticos, no ingredientes crudos raros; no es común encontrar huevos sancochados o productos frescos listos para cocinar en su forma cruda.
  `,

  bodega: `
Bodega de barrio peruana típica. Establecimiento pequeño y cercano que ofrece productos de consumo diario y abarrotes básicos:
- Alimentos no perecibles: arroz, azúcar, sal, fideos, conservas y enlatados.
- Pan fresco o del día anterior, leche, paquetes de galletas, snacks variados y caramelos.
- Bebidas: agua embotellada, gaseosas, jugos en botella, a veces cervezas.
- Productos frescos básicos según disponibilidad: frutas (algunos plátanos, manzanas), verduras simples (tomate, cebolla) y huevos.
- Artículos de higiene y limpieza: detergentes pequeños, papel higiénico, jabones, útiles para el hogar.
- Son negocios muy adaptados al barrio, con surtidos que dependen de lo que se vende más rápido localmente.
  `,

  mercado: `
Mercado tradicional peruano. Espacio abierto o cubierto con muchos puestos de venta de productos frescos y preparados:
- Secciones de productos frescos: frutas tropicales y de temporada (plátano, papaya, mango, naranja), verduras y hortalizas variadas.
- Carnes, pescados y aves en puestos especializados, huevos frescos por unidad o docena.
- Productos secos y a granel: granos, legumbres, especias y hierbas.
- Puestos de comidas listas: platos tradicionales y populares a precios accesibles, como arroz con huevo, lomo saltado simple, sopas calientes, jugos de fruta natural y snacks locales.
- Puestos de jugos recién hechos y picadas de fruta fresca listas para consumir.
- También puede haber venta de otros artículos menores, pero la característica principal es la **alta disponibilidad de productos frescos y preparados a la vista**.
  `,

  casa: `
Lo que típicamente hay en casa de una persona ocupada en Perú o cualquier hogar con cocina y despensa:
- Frutas que aún duren de la semana (plátanos, manzanas, naranjas).  
- Productos básicos: pan (fresco o del día anterior), avena, arroz cocido o fideos secos, huevos crudos o cocidos por el usuario.  
- Lácteos y bebidas: leche, café, té.  
- Sobras o preparaciones caseras del almuerzo anterior que se puedan recalentar.  
- Otros alimentos simples que duran varios días: sardinas en lata, atún, galletas, mantequilla o queso.  
- Estos ítems dependen 100% de lo que el usuario tenga en casa, no de opciones comerciales específicas.
  `,
};
