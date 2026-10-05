# Herramental — prototipo Vue

Prototipo navegable para presentar los flujos del proyecto de préstamo comunitario de herramientas. Está construido con Vue 3, Vue Router y Vite; no requiere backend para la demostración.

## Requisitos

- Node.js 20 o superior
- npm

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre la URL que entrega Vite (normalmente `http://localhost:5173`). Para validar una compilación de producción:

```bash
npm run build
npm run preview
```

## Vistas y demostraciones

- **Explorar:** búsqueda por texto, categoría, catálogo y vista de mapa simulada.
- **Detalle de herramienta y solicitud:** detalle, período, propósito y costo estimado.
- **Publicar herramienta:** formulario con vista previa; la nueva herramienta aparece en el catálogo.
- **Solicitudes:** alterna entre recibidas y enviadas; acepta o rechaza solicitudes.
- **Préstamos:** avanza el estado de confirmado a entregado y devuelto.
- **Historial:** consulta los préstamos completados.
- **Incidentes:** crea reportes y, con el perfil de operador, cambia su estado.
- **Perfil:** cambia entre los perfiles de demo de Enrique, Camila y el equipo operador.

Los datos se guardan en `localStorage`. En **Mi perfil → Restablecer datos de demostración** se recupera el estado inicial.

## Estructura

- `src/views/`: pantallas conectadas con rutas.
- `src/components/`: componentes visuales compartidos.
- `src/stores/demo.js`: datos y acciones de demostración.
- `src/App.vue`: navegación y selector de perfil.
- `src/style.css`: estilos responsive.

## Alcance de la demo

Es una simulación front-end para presentar el flujo y las vistas del informe. No incluye autenticación real, API, base de datos, pagos, mapas de terceros, mensajería ni transferencia de archivos. Los costos y personas son datos de ejemplo; la vista de mapa es ilustrativa y no representa coordenadas reales.
