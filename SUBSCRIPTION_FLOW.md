# Flujo de Suscripción - Documentación Visual

## 📊 Estados de Suscripción

### Estado 1: Usuario Free
```
┌─────────────────────────────────────────┐
│ Suscripción                             │
│                                         │
│ Plan actual              Gratis         │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │   👑 Actualizar a Pro               │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Acciones disponibles:**
- ✅ Actualizar a Pro → redirige a `/upgrade`

---

### Estado 2: Usuario Pro Activo
```
┌─────────────────────────────────────────┐
│ Suscripción                             │
│                                         │
│ Plan actual              👑 Pro         │
│ Próxima renovación       15 de febrero  │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Administrar suscripción         ↗   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│         Cancelar suscripción            │
└─────────────────────────────────────────┘
```

**Acciones disponibles:**
- ✅ Administrar suscripción → abre portal de Polar
- ✅ Cancelar suscripción → abre diálogo de confirmación

**UserMenu muestra:**
```
┌──────────────────────────┐
│ Plan                     │
│ 👑 Pro                   │
└──────────────────────────┘
```

---

### Estado 3: Usuario Pro Cancelado ⭐ NUEVO
```
┌─────────────────────────────────────────┐
│ Suscripción                             │
│                                         │
│ Plan actual        👑 Pro (Cancelado)   │
│ Acceso Pro hasta         15 de febrero  │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │   👑 Renovar suscripción            │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ Ver historial de facturación    ↗   │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Acciones disponibles:**
- ✅ Renovar suscripción → redirige a `/upgrade` para nueva suscripción
- ✅ Ver historial de facturación → abre portal de Polar (solo lectura)
- ❌ NO puede cancelar (ya está cancelado)

**UserMenu muestra:**
```
┌──────────────────────────┐
│ Plan                     │
│ 👑 Pro (Cancelado)       │ ← Clickeable, va a /upgrade
└──────────────────────────┘
```

---

## 🔄 Flujo Completo de Cancelación y Renovación

### Paso 1: Usuario Pro Activo → Cancela
```
Usuario Pro Activo
       ↓
Clic en "Cancelar suscripción"
       ↓
┌─────────────────────────────────────────────┐
│ ¿Cancelar suscripción Pro?                  │
│                                             │
│ Tu suscripción se cancelará, pero seguirás  │
│ teniendo acceso hasta el 15 de febrero.     │
│                                             │
│ [Mantener] [Cancelar suscripción]           │
└─────────────────────────────────────────────┘
       ↓ Confirma
API: POST /api/subscription/cancel
  - polarClient.subscriptions.revoke()
  - UPDATE subscriptions SET status='canceled'
       ↓
✅ Toast: "Suscripción cancelada correctamente"
       ↓
Usuario Pro Cancelado
```

### Paso 2: Usuario Pro Cancelado → Renueva
```
Usuario Pro Cancelado
       ↓
Clic en "Renovar suscripción"
       ↓
Redirige a /upgrade
       ↓
Selecciona plan Pro
       ↓
Checkout de Polar
       ↓
Pago exitoso
       ↓
Webhook de Polar
  - UPDATE subscriptions SET status='active'
       ↓
✅ Usuario Pro Activo nuevamente
```

---

## 🎯 Lógica de Negocio

### Determinación del Estado

```typescript
const isPro = subscription?.status === "active";
const isCanceled = subscription?.status === "canceled";

// Usuario tiene acceso Pro si:
// 1. Está activo, O
// 2. Está cancelado pero aún dentro del periodo pagado
const hasProAccess = 
  subscription?.status === "active" || 
  (subscription?.status === "canceled" && 
   subscription.current_period_end && 
   new Date(subscription.current_period_end) > new Date());
```

### Acciones Permitidas por Estado

| Estado | Actualizar | Administrar | Cancelar | Renovar |
|--------|-----------|-------------|----------|---------|
| `free` | ✅ | ❌ | ❌ | ❌ |
| `active` | ❌ | ✅ | ✅ | ❌ |
| `canceled` | ❌ | ✅ (solo lectura) | ❌ | ✅ |

---

## 📱 Experiencia de Usuario

### Escenario 1: Cancelar por Error
**Problema:** Usuario cancela pero se arrepiente inmediatamente.

**Solución:** 
- ✅ Puede renovar inmediatamente desde `/profile`
- ✅ Botón prominente "Renovar suscripción"
- ✅ Mantiene acceso hasta fin del periodo

### Escenario 2: Cancelar y Volver Después
**Problema:** Usuario cancela en febrero, quiere volver en marzo.

**Flujo:**
1. Cancela en febrero → status: `canceled`
2. Mantiene acceso hasta 28 de febrero
3. Desde 1 de marzo → vuelve a `free`
4. Ve botón "Actualizar a Pro"
5. Puede suscribirse nuevamente

### Escenario 3: Cambiar de Opinión Durante el Periodo
**Problema:** Usuario cancela pero cambia de opinión antes de que expire.

**Flujo:**
1. Cancela el 5 de febrero (expira el 28)
2. El 10 de febrero ve "Renovar suscripción"
3. Hace clic → va a `/upgrade`
4. Compra nuevo plan Pro
5. Nueva suscripción comienza (puede ser inmediata o al fin del periodo actual)

---

## 🔧 Implementación Técnica

### Componentes Involucrados

```
app/(dashboard)/(routes)/profile/page.tsx
  ├── Determina estados: isPro, isCanceled
  ├── Renderiza botones según estado
  └── Pasa props a CancelSubscription

components/modules/profile/cancel-subscription.tsx
  ├── Diálogo de confirmación
  ├── Llama a POST /api/subscription/cancel
  └── Maneja loading y errores

app/api/subscription/cancel/route.ts
  ├── Verifica autenticación
  ├── Valida pertenencia de suscripción
  ├── polarClient.subscriptions.revoke()
  └── UPDATE Supabase → status: 'canceled'
```

### Base de Datos

```sql
-- Estado de suscripción en Supabase
Table: subscriptions
Columns:
  - status: 'free' | 'active' | 'canceled' | 'past_due'
  - current_period_end: timestamp (importante para cancelados)
  - polar_subscription_id: text (necesario para renovar)
  - polar_customer_id: text (necesario para portal)
```

---

## 🎨 UI/UX Decisiones de Diseño

### Por qué "Renovar" en lugar de "Reactivar"

✅ **"Renovar suscripción"**
- Más familiar para usuarios
- Implica nuevo periodo de pago
- Consistente con "Actualizar a Pro"

❌ **"Reactivar suscripción"**
- Podría confundir (¿reactiva la actual o crea nueva?)
- Menos común en SaaS

### Por qué mostrar "Ver historial de facturación"

✅ **Beneficios:**
- Usuario cancelado puede revisar facturas pasadas
- Acceso al portal de Polar en modo lectura
- Transparencia total

### Por qué mantener acceso hasta fin del periodo

✅ **Razones:**
- Usuario ya pagó por ese periodo
- Práctica estándar en SaaS (Stripe, Paddle, Polar)
- Evita sensación de "me robaron"
- Da tiempo para cambiar de opinión

---

## 📊 Métricas Sugeridas

### Tracking de Cancelaciones

```typescript
// Eventos a trackear:
- "subscription_cancel_clicked" // Usuario abre diálogo
- "subscription_cancel_confirmed" // Confirmó cancelación
- "subscription_cancel_abandoned" // Cerró diálogo sin confirmar
- "subscription_renew_clicked" // Cancelado quiere renovar
```

### Tasa de Reactivación

```
Reactivación = (Renovaciones después de cancelar) / (Total cancelaciones)
```

Si esta métrica es alta (>20%), significa que:
- ✅ El proceso de renovación es efectivo
- ✅ Los usuarios aprecian mantener acceso hasta fin de periodo

---

## 🚀 Próximas Mejoras

### Corto Plazo
- [ ] Email de confirmación de cancelación
- [ ] Recordatorio antes de que expire el periodo
- [ ] Descuento de "reactivación" para usuarios cancelados

### Largo Plazo
- [ ] Pausar suscripción (1-3 meses)
- [ ] Cambiar entre planes sin cancelar
- [ ] Programa de retención (oferta antes de cancelar)

---

**Versión:** 1.0.0  
**Fecha:** 30 de Enero, 2025  
**Estado:** ✅ Implementado y Funcionando