import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Next.js 16: cookies(), headers() son async ahora
    // Si necesitas accederlas, usa await
    // const cookieStore = await cookies();
    // const headersList = await headers();

    // Aquí puedes agregar checks adicionales:
    // - Conexión a base de datos
    // - Verificar servicios externos
    // - Verificar variables de entorno críticas

    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      // No expongas información sensible en producción
      version: process.env.npm_package_version || '1.0.0',
    };

    return NextResponse.json(healthCheck, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
}

// También puedes exponer HEAD para checks más ligeros
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
