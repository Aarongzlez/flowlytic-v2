# Flowlytic — borrador publicado

El propietario ha solicitado expresamente dejar los datos pendientes: esta entrega es un borrador. No está preparada para captar contactos ni indexarse.

## Datos pendientes de escribir

- `[LEGAL_COMPANY_NAME]`: entidad legal.
- `[CONTACT_EMAIL]`: email público de contacto.
- `[FORM_RECIPIENT]`: destinatario de solicitudes.
- `[FORM_ENDPOINT_OR_CRM]`: recepción real con validación, protección contra spam y prueba completa.
- `[PRIVACY_URL]`: política de privacidad revisada.
- `[LEGAL_JURISDICTION]`: jurisdicción para la revisión legal.
- `[CALENDAR_URL]`: opcional; sin él, los CTA solicitan una llamada y enlazan al formulario.
- `[TERMS_URL]`: según revisión legal.
- Dominio propio: opcional; el borrador usa la dirección de Netlify.

La configuración editable está en `site.config.json`. Todo el copy del manual, incluidos los servicios y FAQ, está centralizado en `content.json`. Los tres escenarios permanecen como `Illustrative scenario`; no representan trabajos realizados. No hay clientes, testimonios, redes, acreditaciones ni datos legales inventados.

## Protecciones del borrador

- `noindex, nofollow` en HTML y cabeceras, robots sin rastreo y sitemap vacío.
- Campos de contacto y envío desactivados. El mensaje sirve únicamente para probar la transferencia desde la calculadora; no se envía ni persiste.
- Sin endpoint de recepción, analítica, cookies ni dependencias de terceros en el navegador.
- CSP bloquea conexiones y envíos de formularios.
- Build limitado a modo de revisión: cambiar un booleano no activa un backend ficticio.

## Edición y despliegue

1. Instalar dependencias: `npm ci`.
2. Construir: `npm run build`.
3. Revisar: `npm start` y abrir `http://127.0.0.1:4173`.
4. Probar la calculadora: `npm test`.
5. Subir solamente `dist` a Netlify, nunca la carpeta completa con fuentes y notas internas.

Logo vectorial de ejemplo, favicon y preview social en `dist/assets`. Fuentes Manrope e Inter locales; sus licencias OFL se incluyen con los archivos publicados.

## Para una publicación definitiva

Completar los datos, revisar política y términos, implementar y probar recepción real (validación de servidor, honeypot, rate limiting, errores, duplicados y notificación interna), incorporar consentimiento si corresponde, ajustar CSP, y aprobar la indexación explícitamente. No activar success ficticio ni enlaces provisionales.

El logo es una propuesta visual de ejemplo y requiere decisión de marca antes de adoptarlo como identidad definitiva.
