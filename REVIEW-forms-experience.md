# Revisión — `forms-experience.html`

**Fecha:** 2026-09-07
**Revisor:** Zico (asistente de Edwin)
**Estado:** documentado, sin cambios aplicados al código.

Revisión del formulario de reserva de cupo de **The Admissions Lab Experience** (Early Bird S/210).

---

## Qué es

Form estático HTML/CSS/JS que captura: nombre, correo, WhatsApp (con código de país), país de residencia, nivel al que aspira, área de estudio, referral (opcional) y comentario (opcional). Envía por `fetch` a un webhook de n8n y muestra estado de éxito/error.

---

## Lo que está bien

- Form limpio, responsive, paleta coherente (navy/brass, tipografías Playfair Display + Inter).
- Anti-spam por honeypot (campo `website` oculto) correctamente implementado.
- Estados de carga / éxito / error correctos, `novalidate` + validación manual.
- Accesibilidad razonable (`label`, `aria-live`, `prefers-reduced-motion`).
- Los campos core del lead objetivo (correo + número) están presentes.

---

## Hallazgos a revisar (ordenados por prioridad)

1. **[Crítico] El webhook apunta a TEST, no a producción.**
   - URL actual: `https://edwinsantos.app.n8n.cloud/webhook-test/registro-experience`
   - Para producción debe ser: `https://edwinsantos.app.n8n.cloud/webhook/registro-experience` (sin `-test`).
   - Tal como está, los registros caen a un flujo de prueba y pueden no disparar el workflow real / perderse.

2. **[Alto] No hay validación real de correo.** Solo `type="email"` del navegador, que valida formato pero no existencia. Si el objetivo es captar leads válidos para contactar después, falta una capa de verificación (p. ej. MX/DNS lookup, verificación con proveedor tipo ZeroBounce/NeverBounce, o confirmación por enlace).

   *(Nota de contexto: esto lo pidió Edwin expresamente en la llamada del 2026-09-07 — "validación de que el correo sea real".)*

3. **[Medio] `fetch` no valida el body de respuesta.** Solo chequea `res.ok`. Si n8n responde 200 con un error en el body, igual se muestra "cupo reservado". Conviene validar el contenido de la respuesta.

4. **[Bajo] Teléfono sin `pattern`.** El campo `tel` no valida formato; un número mal formado pasa si tiene contenido. Si se quiere el dato limpio para contactar, agregar un `pattern` razonable (variable por país).

5. **[Bajo] `referral` con placeholder de obligatorio.** El `<select>` de referral no es `required` pero muestra "— Elige una opción —" como placeholder; visualmente parece obligatorio aunque se puede enviar vacío.

---

## Recomendación

Atender **1** y **2** antes de publicar. El resto es mejora progresiva.

*No se modificó ni commiteó ningún código; solo se registra este hallazgo.*
