# Página de Perfil - Documentación

## 📋 Resumen

Se ha implementado una página completa de perfil de usuario con diseño minimalista, siguiendo las mejores prácticas de la aplicación. Incluye administración de datos personales, integración con el portal de suscripción de Polar y **cancelación de suscripción**.

---

## 🎯 Características Implementadas

### 1. **Página de Perfil** (`/profile`)
- Diseño minimalista con cards organizadas
- Información personal editable
- Detalles de la cuenta (email, fecha de creación)
- Gestión de suscripción integrada con Polar
- **Cancelación de suscripción con confirmación**

### 2. **Formulario con React Hook Form + Zod**
- Validación automática del nombre
- Estados de carga gestionados por `formState`
- Mensajes de error y éxito con `toast` (sonner)
- Solo habilita el botón de guardar si hay cambios (`isDirty`)

### 3. **Portal de Cliente de Polar**
- Endpoint API: `/api/portal`
- Redirige al portal autoadministrable de Polar
- Permite a usuarios Pro gestionar su suscripción
- Botón visible solo si existe `polar_customer_id`

### 4. **Cancelación de Suscripción** ⭐ NUEVO
- Link discreto "Cancelar suscripción" (estilo Lovable/SaaS modernos)
- Diálogo de confirmación con información clara
- Cancela inmediatamente en Polar usando `subscriptions.revoke()`
- Actualiza estado en Supabase a `"canceled"`
- Usuario mantiene acceso Pro hasta fin del periodo
- Endpoint API: `/api/subscription/cancel`

### 5. **Menú de Usuario Actualizado**
- Nueva opción "Mi perfil" en el dropdown
- Organizado por secciones: Plan, Cuenta, Apariencia
- Iconos coherentes y semántica visual clara

---

## 📁 Estructura de Archivos

```
buen-plato/
├── app/
│   ├── (dashboard)/
│   │   └── (routes)/
│   │       └── profile/
│   │           └── page.tsx              # Página principal de perfil
│   └── api/
│       ├── portal/
│       │   └── route.ts                  # API route para Polar Customer Portal
│       └── subscription/
│           └── cancel/
│               └── route.ts              # API route para cancelar suscripción ⭐ NUEVO
│
├── components/
│   └── modules/
│       ├── profile/
│       │   ├── profile-form.tsx          # Formulario con react-hook-form
│       │   └── cancel-subscription.tsx   # Componente de cancelación ⭐ NUEVO
│       └── shared/
│           └── user-menu.tsx             # Menú actualizado con opción de perfil
│
└── types/
    └── schemas/
        └── profile.ts                    # Schema de validación con Zod
```

---

## 🔧 Tecnologías Utilizadas

- **React Hook Form** - Gestión de formularios sin boilerplate
- **Zod** - Validación de esquemas
- **Polar SDK** - Integración con portal de suscripciones
- **Shadcn UI** - Componentes: Card, Field, Button, DropdownMenu
- **Sonner** - Notificaciones toast
- **Supabase** - Base de datos (profiles, subscriptions)
- **date-fns** - Formateo de fechas en español

---

## 📦 Componentes Clave

### `ProfileForm`
```tsx
// Uso de react-hook-form con zodResolver
const form = useForm<ProfileFormValues>({
  resolver: zodResolver(profileSchema),
  defaultValues: { name: initialName },
});

// Estados automáticos
form.formState.isSubmitting  // Loading state
form.formState.isDirty       // Detecta cambios
form.formState.errors        // Errores de validación
```

### API Route - Polar Portal
```tsx
export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
  getCustomerId: async (req) => {
    // Obtiene polar_customer_id desde Supabase
  },
});
```

### Componente - Cancelación de Suscripción
```tsx
<CancelSubscription
  subscriptionId={subscription.polar_subscription_id!}
  currentPeriodEnd={subscription.current_period_end}
/>
```

### API Route - Cancelar Suscripción
```tsx
export async function POST(request: Request) {
  // 1. Verificar autenticación
  // 2. Validar que la suscripción pertenece al usuario
  // 3. Cancelar en Polar usando revoke()
  await polarClient.subscriptions.revoke({ id: subscriptionId });
  // 4. Actualizar estado en Supabase a "canceled"
  // 5. Usuario mantiene acceso hasta current_period_end
}
```

### Utilidad de Formateo de Fechas
```tsx
// lib/format-date.ts
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Formato largo: "15 de febrero de 2025"
formatDateLong(date);

// Formato corto: "15/02/2025"
formatDateShort(date);

// Con hora: "15 de febrero de 2025, 14:30"
formatDateTime(date);
```

---

## 🎨 Diseño

### Cards Organizadas

1. **Información Personal**
   - Formulario editable de nombre
   - Validación en tiempo real
   - Botón de guardar habilitado solo con cambios

2. **Cuenta**
   - Email (solo lectura)
   - Fecha de creación de cuenta

3. **Suscripción**
   - Badge de plan actual (Gratis/Pro/Pro Cancelado)
   - Fecha de próxima renovación o acceso hasta (según estado)
   - Botón de upgrade (usuarios Free)
   - Botón de administrar suscripción (usuarios Pro con customer_id)
   - **Link de cancelar suscripción** (usuarios Pro activos) ⭐ NUEVO

---

## 🔐 Seguridad

- Validación de usuario autenticado en server component
- Políticas RLS de Supabase respetadas
- Solo el dueño puede actualizar su perfil
- Portal de Polar requiere `polar_customer_id` válido

---

## 🚀 Flujo de Usuario

### Usuario Free
1. Accede a `/profile`
2. Puede editar su nombre
3. Ve botón "Actualizar a Pro" → redirige a `/upgrade`

### Usuario Pro (Activo)
1. Accede a `/profile`
2. Puede editar su nombre
3. Ve su fecha de renovación
4. Puede hacer clic en "Administrar suscripción" → abre portal de Polar
5. **Puede cancelar suscripción** → Diálogo de confirmación
   - Explica que mantendrá acceso hasta fin de periodo
   - Cancela inmediatamente si confirma
   - Actualiza UI mostrando "Pro (Cancelado)"

### Usuario Pro (Cancelado)
1. Accede a `/profile`
2. Ve badge "Pro (Cancelado)"
3. Ve "Acceso Pro hasta [fecha]"
4. Después de esa fecha → vuelve a plan Free
5. No puede cancelar nuevamente (ya cancelado)

---

## ✅ Mejoras Implementadas vs. Código Inicial

| Antes | Después |
|-------|---------|
| `useState` para cada campo | `useForm` con estado centralizado |
| `isLoading` manual | `formState.isSubmitting` automático |
| Validación manual | Zod schema con mensajes claros |
| Mensajes de error en div | Componente `FieldError` de shadcn |
| Botón siempre habilitado | Solo habilitado con `isDirty` |
| Sin portal de Polar | Integración completa con CustomerPortal |
| Sin opción de cancelar | Link discreto para cancelar suscripción ⭐ |
| Cancelación manual/confusa | Diálogo claro con información del periodo ⭐ |

---

## 🧪 Testing

### Verificar Funcionalidad

1. **Editar Nombre:**
   ```
   - Cambia el nombre
   - Botón "Guardar cambios" se habilita
   - Toast de éxito aparece
   - Página se refresca con nuevo nombre
   ```

2. **Validación:**
   ```
   - Deja el nombre vacío → error: "El nombre es requerido"
   - Escribe más de 100 caracteres → error de longitud
   ```

3. **Portal Polar (usuarios Pro):**
   ```
   - Clic en "Administrar suscripción"
   - Se abre portal de Polar en nueva pestaña
   - Redirige con customer_id correcto
   ```

4. **Cancelar Suscripción (usuarios Pro activos):** ⭐ NUEVO
   ```
   - Clic en "Cancelar suscripción"
   - Aparece diálogo de confirmación
   - Muestra fecha hasta la que tendrá acceso
   - Al confirmar, cancela en Polar
   - Actualiza estado a "canceled"
   - Toast de éxito aparece
   - Badge cambia a "Pro (Cancelado)"
   - Link de cancelar desaparece
   ```

---

## 📦 Utilidades Creadas

### `lib/format-date.ts`
Funciones centralizadas de formateo de fechas usando `date-fns`:

- `formatDateLong()` - Formato largo en español
- `formatDateShort()` - Formato corto (dd/MM/yyyy)
- `formatDateTime()` - Con hora incluida

**Ventajas:**
- ✅ Consistencia en toda la app
- ✅ Locale español centralizado
- ✅ Manejo de errores robusto
- ✅ Reusable en toda la aplicación

**Uso:**
```tsx
import { formatDateLong } from "@/lib/format-date";

// Antes
new Date(date).toLocaleDateString("es-ES", {...})

// Después
formatDateLong(date)
```

---

## 📝 Variables de Entorno Requeridas

```env
# Polar (ya configuradas)
POLAR_ACCESS_TOKEN=<tu_access_token>
NODE_ENV=production|development

# Supabase (ya configuradas)
NEXT_PUBLIC_SUPABASE_URL=<tu_url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<tu_key>
```

---

## 🔄 Próximas Mejoras Sugeridas

- [x] ✅ **Cancelar suscripción** (implementado)
- [ ] Reactivar suscripción cancelada
- [ ] Agregar opción de cambiar email
- [ ] Implementar cambio de contraseña
- [ ] Agregar foto de perfil
- [ ] Historial de suscripciones y facturas
- [ ] Preferencias de notificaciones
- [ ] Exportar datos de usuario (GDPR)
- [ ] Pausar suscripción temporalmente

---

## 📚 Referencias

- [Polar Customer Portal Docs](https://docs.polar.sh/guides/customer-portal)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Shadcn UI Field Component](https://ui.shadcn.com/)

---

## 🎯 Filosofía de Diseño - Cancelación

Siguiendo el patrón de SaaS modernos como **Lovable**, **Linear** y **Vercel**:

- ✅ Link discreto, no botón prominente (no empujamos a cancelar)
- ✅ Diálogo de confirmación claro y honesto
- ✅ Explica qué pasará (mantiene acceso hasta fin de periodo)
- ✅ Sin preguntas molestas del tipo "¿Por qué cancelas?"
- ✅ Proceso en un solo clic después de confirmar
- ✅ Feedback inmediato (toast + actualización de UI)
- ✅ Estado visual claro ("Pro (Cancelado)")

**Fecha de implementación:** 30 de Enero, 2025  
**Autor:** AI Assistant  
**Versión:** 1.1.0 (agregada cancelación de suscripción)