# Flowlytic — rediseño para revisión local

Fecha: 17 de septiembre de 2026.

## Estado

**Publicado y verificado como una nueva web independiente: https://flowlyticv2.netlify.app/.** La versión original permanece intacta. Identificadores y comprobaciones en `DEPLOYMENTS.md`.

Vista local: http://127.0.0.1:4173/

La web original `flowlytic-preview` debe conservarse íntegra. El propietario ha pedido expresamente un proyecto nuevo para el rediseño.

## Cambios

- Portada editorial con titulares más grandes, composición más clara, tonos marfil, verde bosque y salvia.
- Diagrama propio con recorridos animados y volumen visual, sin vídeo pesado ni recursos externos.
- Tres ejemplos interactivos: Intake, Approvals y Reporting.
- Entrada suave de contenido al hacer scroll, estados hover, enlace de navegación activo y progreso de lectura.
- Servicios con una tarjeta destacada de diagnóstico y una composición de tarjetas de diferentes tamaños.
- Mejoras visuales en proceso, escenarios, calculadora, preguntas frecuentes, contacto y pie.
- Pausa global de animaciones, respeto de `prefers-reduced-motion` y suspensión de movimiento cuando el diagrama está fuera de pantalla.
- Se conserva el carácter de borrador, el formulario sin envíos y los escenarios identificados como ilustrativos.

## Comprobaciones

- Build completado y cuatro pruebas de cálculo aprobadas.
- Seis anchos comprobados en Chrome: 320, 375, 768, 1024, 1280 y 1440 px. Sin desbordamiento horizontal ni de cabecera.
- Cero anclas rotas.
- Axe: cero incidencias en la selección de reglas WCAG A/AA, 2.1 AA, 2.2 AA y buenas prácticas. 45 reglas aprobadas tanto a 375 como a 1440 px, con todo el contenido revelado antes del análisis.
- Selector de flujos, pausa, menú móvil con Escape y devolución de foco comprobados.
- Calculadora y conservación del texto al transferir la estimación comprobadas en navegador.
- Sin errores ni advertencias de consola observados.
- No se ha realizado certificación de accesibilidad, prueba con lector de pantalla ni pruebas en otros motores de navegador.

## Apoyo visual

Se intentó una generación decorativa con Higgsfield. El servicio la rechazó porque la cuenta requiere un plan Basic o superior. Se utilizó una ilustración vectorial propia animada con CSS/SVG; no se cambió el plan ni se efectuó una compra.

## Archivos y continuidad

La versión anterior se conserva en `.revisions/2026-09-17-before`.

La nueva composición se encuentra en `src/design.mjs`; el diseño en `src/redesign.css` y las interacciones de movimiento en `src/motion.js`. `npm run build` prepara `dist` y `npm start` sirve el borrador local. La configuración de contacto permanece pendiente en `site.config.json`.

Publicación autorizada en un proyecto nuevo llamado `flowlyticv2`, con URL `https://flowlyticv2.netlify.app`. No actualizar ni eliminar el proyecto original `flowlytic-preview`, y no activar la captación de datos. Las futuras actualizaciones de este código corresponden a `flowlyticv2`.
