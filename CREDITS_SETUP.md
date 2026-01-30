# Sistema de Créditos Diarios - Guía de Configuración

## Resumen

Este documento describe cómo configurar e implementar el sistema de créditos diarios en Buen Plato.

## Características Implementadas

- ✅ 5 créditos gratuitos diarios para usuarios free
- ✅ Reset automático a medianoche
- ✅ Acceso ilimitado para usuarios Pro
- ✅ Contador de créditos en el navbar
- ✅ Modal de upgrade cuando se agotan los créditos
- ✅ Validación en las 4 API routes (menu, recommendation, breakfast, cooking)
- ✅ Integración con sistema de suscripciones existente

## Paso 1: Ejecutar Migración de Base de Datos

### Opción A: Desde Supabase Dashboard (Recomendado)

1. Ve a tu proyecto en https://supabase.com/dashboard
2. Navega a "SQL Editor" en el menú lateral
3. Crea una nueva query
4. Copia y pega el contenido de `supabase/migrations/create_user_credits.sql`
5. Ejecuta la query

### Opción B: Desde CLI de Supabase

```bash
# Instalar Supabase CLI (si no lo tienes)
npm install -g supabase

# Iniciar sesión
supabase login

# Link a tu proyecto
supabase link --project-ref TU_PROJECT_REF

# Aplicar migración
supabase db push
```

## Paso 2: Verificar la Instalación

### Verificar la tabla en Supabase

```sql
-- Verificar que la tabla existe
SELECT * FROM public.user_credits LIMIT 1;

-- Verificar políticas RLS
SELECT * FROM pg_policies WHERE tablename = 'user_credits';
```

### Verificar en la aplicación

1. Inicia la aplicación: `npm run dev`
2. Inicia sesión como usuario free
3. Verifica que aparece "5/5 intentos hoy" en el navbar
4. Usa una funcionalidad de IA
5. Verifica que el contador baja a "4/5 intentos hoy"

## Paso 3: Pruebas

### Probar consumo de créditos

1. Como usuario free, usa las funcionalidades hasta agotar los 5 créditos
2. Verifica que aparece el modal de upgrade
3. Intenta usar otra funcionalidad - debería mostrar el modal nuevamente

### Probar reset diario

```sql
-- Simular reset manual (para testing)
UPDATE user_credits 
SET credits_remaining = 5, last_reset_date = CURRENT_DATE
WHERE user_id = 'TU_USER_ID';
```

### Probar usuarios Pro

1. Actualiza un usuario a Pro desde el dashboard de Polar
2. Verifica que el contador de créditos NO aparece
3. Usa las funcionalidades - debería funcionar ilimitadamente

## Arquitectura

```
┌─────────────┐
│   Cliente   │
│             │
│ CreditsDisplay ◄─── useCredits hook ◄─── CreditsContext
│                                               │
│ UpgradeModal                                  │
└─────────────┘                                 │
       │                                        │
       ▼                                        ▼
┌─────────────┐                         ┌──────────────┐
│  API Route  │ ◄──── validateAndConsumeCredit ◄─── user_credits
│             │                         │              │
│ /api/menu   │                         │   Supabase   │
│ /api/cooking│                         └──────────────┘
│ etc.        │
└─────────────┘
```

## Archivos Creados/Modificados

### Nuevos Archivos
- `supabase/migrations/create_user_credits.sql` - Migración de DB
- `types/credits.ts` - Tipos TypeScript
- `lib/credits.ts` - Helper server-side
- `contexts/credits-context.tsx` - Contexto React
- `components/providers/credits-provider.tsx` - Provider
- `hooks/shared/use-credits.ts` - Hook personalizado
- `components/modules/shared/credits-display.tsx` - UI contador
- `components/modules/shared/upgrade-modal.tsx` - Modal upgrade

### Archivos Modificados
- `types/database.types.ts` - Agregado tipo user_credits
- `components/providers/subscription-provider.tsx` - Integrado CreditsProvider
- `components/modules/shared/navbar.tsx` - Agregado CreditsDisplay
- `app/api/menu/route.ts` - Validación de créditos
- `app/api/recommendation/route.ts` - Validación de créditos
- `app/api/breakfast/route.ts` - Validación de créditos
- `app/api/cooking/route.ts` - Validación de créditos
- `components/modules/craving/client.tsx` - Integrado sistema de créditos
- `components/modules/menu/food-cards.tsx` - Integrado sistema de créditos
- `components/modules/cooking/client.tsx` - Integrado sistema de créditos
- `components/modules/ingredients/client.tsx` - Integrado sistema de créditos

## Lógica de Créditos

### Reset Diario
- El reset es "lazy" (ocurre en el momento del request)
- No requiere cron jobs
- Compara `last_reset_date` con la fecha actual
- Si son diferentes, resetea a 5 créditos

### Usuarios Pro
- Saltan toda la lógica de créditos (early return)
- No consumen créditos
- No se les muestra el contador

### Atomicidad
- Usa transacciones de Supabase para garantizar consistencia
- Un solo UPDATE con RETURNING para consumir crédito
- RLS policies garantizan que usuarios solo vean sus propios créditos

## Troubleshooting

### "Error fetching credits"
- Verifica que la tabla `user_credits` existe
- Verifica que las políticas RLS están activas
- Revisa los logs de Supabase

### "Credits no se resetean"
- Verifica la zona horaria del servidor de Supabase
- Ejecuta manualmente el query de reset (ver arriba)

### "Modal no aparece"
- Verifica que `hasCredits` es false
- Revisa la consola del navegador por errores
- Verifica que el contexto está correctamente integrado

## Próximos Pasos Recomendados

1. **Analytics**: Agregar tracking de uso de créditos
2. **Notificaciones**: Notificar cuando queden pocos créditos
3. **Dashboard Admin**: Panel para ver estadísticas de uso
4. **Límite por hora**: Agregar rate limiting adicional

## Contacto

Si tienes problemas con la implementación, revisa:
1. Los logs de Supabase
2. La consola del navegador
3. Los errores de compilación de TypeScript
