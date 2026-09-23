# Flowlytic — comprobaciones del borrador

Fecha: 14 de septiembre de 2026.

## Resultado

- Build correcto; búsqueda de placeholders sin resultados en los archivos públicos.
- 4 pruebas de calculadora aprobadas: fórmulas del manual, valores límite, entradas inválidas y transferencia sin sobrescritura ni duplicación.
- Navegador Chrome conectado: sin desbordamiento horizontal en 320, 375, 768, 1024, 1280 y 1440 px, también con valores máximos de la calculadora.
- 0 destinos de anclas inexistentes.
- Axe: 0 incidencias en las reglas WCAG A/AA, WCAG 2.1 AA, WCAG 2.2 AA y buenas prácticas seleccionadas, en móvil (375 px) y escritorio (1440 px); 45 reglas aprobadas. Esto no constituye una certificación de accesibilidad.
- Menú móvil: apertura, foco inicial, Escape y devolución del foco comprobados en el navegador.
- FAQ: apertura real comprobada.
- Calculadora en navegador: 300 repeticiones × 10 minutos × 50% × $35 = 50.0 horas actuales, 25.0 recuperables, $875/mes, $10,500/año.
- Mensaje existente conservado al añadir la estimación y foco trasladado al campo.
- Recursos locales: sin solicitudes a fuentes o bibliotecas externas.

## Limitaciones de la revisión

No se han ejecutado Lighthouse ni pruebas en Safari, Firefox, Edge, dispositivos físicos o lectores de pantalla. No hay captación, backend, notificación interna ni analítica que probar: el usuario ha solicitado un borrador con los datos pendientes.

## Despliegue

Dirección del borrador: https://flowlytic-preview.netlify.app

Proyecto de Netlify: `flowlytic-preview`.

La entrega mantiene `noindex` y el envío de datos desactivado. Revisar `LAUNCH_NOTES.md` antes de habilitar una web comercial definitiva.

Verificación pública completada: HTML, CSS, JavaScript, fuentes, favicon, imagen social y robots devuelven HTTP 200; la página inexistente devuelve HTTP 404. CSS publicado idéntico al local. Cabecera `X-Robots-Tag: noindex, nofollow`, URL canónica correcta, sin placeholders públicos y CSP que bloquea conexiones y envíos. Calculadora operativa en Netlify (240 repeticiones: 40.0 horas, 24.0 recuperables y $840/mes), sin errores de consola observados.
