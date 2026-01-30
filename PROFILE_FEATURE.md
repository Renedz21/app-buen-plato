# Página de Perfil - Documentación

## 📋 Resumen

Se ha implementado una página completa de perfil de usuario con diseño minimalista, siguiendo las mejores prácticas de la aplicación. Incluye administración de datos personales e integración con el portal de suscripción de Polar.

---

## 🎯 Características Implementadas

### 1. **Página de Perfil** (`/profile`)
- Diseño minimalista con cards organizadas
- Información personal editable
- Detalles de la cuenta (email, fecha de creación)
- Gestión de suscripción integrada con Polar

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

### 4. **Menú de Usuario Actualizado**
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
│       └── portal/
│           └── route.ts                  # API route para Polar Customer Portal
│
├── components/
│   └── modules/
│       ├── profile/
│       │   └── profile-form.tsx          # Formulario con react-hook-form
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
   - Badge de plan actual (Gratis/Pro)
   - Fecha de próxima renovación (solo Pro)
   - Botón de upgrade (usuarios Free)
   - Botón de administrar suscripción (usuarios Pro con customer_id)

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

### Usuario Pro
1. Accede a `/profile`
2. Puede editar su nombre
3. Ve su fecha de renovación
4. Puede hacer clic en "Administrar suscripción" → abre portal de Polar en nueva pestaña

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

- [ ] Agregar opción de cambiar email
- [ ] Implementar cambio de contraseña
- [ ] Agregar foto de perfil
- [ ] Historial de suscripciones
- [ ] Preferencias de notificaciones
- [ ] Exportar datos de usuario (GDPR)

---

## 📚 Referencias

- [Polar Customer Portal Docs](https://docs.polar.sh/guides/customer-portal)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Shadcn UI Field Component](https://ui.shadcn.com/)

---

**Fecha de implementación:** 30 de Enero, 2025  
**Autor:** AI Assistant  
**Versión:** 1.0.0