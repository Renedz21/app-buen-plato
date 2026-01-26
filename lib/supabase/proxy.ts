import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const BOT_PATTERNS = [
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "facebot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "telegrambot",
  "applebot",
  "semrushbot",
  "ahrefsbot",
  "mj12bot",
  "dotbot",
  "petalbot",
] as const;

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some((bot) => ua.includes(bot));
}

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent");

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Permitir que los bots accedan a rutas públicas sin redirección
  if (isBot(userAgent) && isPublicRoute) {
    return NextResponse.next();
  }

  // Crear respuesta inicial
  let response = NextResponse.next({
    request,
  });

  // Crear cliente de Supabase con manejo correcto de cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Establecer cookies en el request para que estén disponibles
          // en Server Components durante esta petición
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          // Crear nueva respuesta con las cookies actualizadas
          response = NextResponse.next({
            request,
          });

          // Establecer cookies en la respuesta para que se envíen al navegador
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // CRÍTICO: Usar getUser() en lugar de getSession()
  // getUser() valida el token con el servidor de Supabase en cada request
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Usuario NO autenticado intentando acceder a ruta protegida
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    // Opcional: guardar la URL original para redirección después del login
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  // Usuario autenticado intentando acceder a rutas públicas de auth
  if (user && (pathname === "/login" || pathname === "/register")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Usuario autenticado en la raíz, redirigir a dashboard
  if (user && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}
