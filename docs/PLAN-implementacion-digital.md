# TAL — Arquitectura digital objetivo (Fase 1)

**Fecha:** 2026-09-09
**Fuente:** `Informe_Implementacion_Digital_The_Admissions_Lab.docx` (brief 12 meses, sept 2026 – ago 2027)
**Estado:** implementación parcial bajo path oculto `/tal/`. **Nada enlazado al index principal.**

---

## 1. Qué se implementó (hoy, en código)

Toda la web nueva vive bajo `/tal/` — accesible por URL directa, **sin** modificar el `index.html` principal.

| Archivo | Qué es | Estado |
|---|---|---|
| `tal/tal.css` | Hoja de estilos compartida (sistema crema/dorado + Playfair/Inter) | ✅ |
| `tal/study.html` | Landing TAL Study (journey + 6 productos + FAQ) | ✅ |
| `tal/career.html` | Landing TAL Career (journey + 3 productos) | ✅ |
| `tal/community.html` | TAL Community / The Abroad Club + waitlist | ✅ |
| `tal/partners.html` | TAL Partners B2B (audiencias + servicios) | ✅ |
| `tal/start.html` | **Form inteligente de entrada** B2C + captura UTM + consentimiento | ✅ |
| `tal/partners-form.html` | Form institucional B2B (lead diferenciado `lead_type=B2B`) | ✅ |

### Detalles del form de entrada (`start.html`)
- Campos mínimos §5.1: nombre, email, WhatsApp, país, profesión, experiencia, nivel, objetivo, destino, timeline, necesidad, fuente.
- **UTM tracking**: lee `utm_source`/`utm_medium`/`utm_campaign` de la URL y persiste en `localStorage` para atribución cross-page.
- Consentimiento explícito (checkbox).
- `robots noindex` en los forms (no indexar datos de captación).
- **Failsafe**: si el webhook no está configurado, guarda el lead en `localStorage` en vez de perderlo. (Temporal — reemplazar por envío real a n8n.)

---

## 2. Qué se implementó en Notion

Acceso confirmado: owner del teamspace **"Lils in London"** (vía cuenta de Edwin).

| Base | Propósito | Estado |
|---|---|---|
| `📥 TAL Leads` | Leads B2C/B2B con línea, estado, fuente, timeline, UTM, próxima acción | ✅ creada |
| `🗂 TAL Servicios` | Catálogo oficial (nombre, línea, precio, duración, SLA, responsable) | ✅ creada |
| `🎓 TAL Oportunidades` | Becas/programas estructurados (§11) listos para matching futuro | ✅ creada |
| `📚 Registros – The Admissions Lab Experience` | Leads del Experience (ya existía) | 🔎 mapeada, no tocada |

**Pipeline definido** en `TAL Leads` (campo `Estado`): `Nuevo → Contactado → Interesado → Pago pendiente → Pagó → Onboarding → En proceso → Entregado → Finalizado → Alumni` (+ `No califica`).

---

## 3. Lo que queda PENDIENTE (no implementable solo desde aquí)

| Ítem | Bloqueo |
|---|---|
| **Webhooks n8n** para conectar `start.html` / `community` / `partners-form` → Notion | Falta URL de producción + flujo en n8n |
| **Automatizaciones A1–A8** (§7) | Requieren n8n/Make + credenciales |
| **Dashboard ejecutivo** (§9) | Requiere GA4 + fuente de datos |
| **GA4 / Search Console / Meta Pixel** (§10) | Requieren cuentas + IDs |
| **Candidate Brief IA** (§12) | Requiere API key + flujo validado |
| **Opportunity Finder** (§13) | Fase futura (la base de Oportunidades ya lo deja preparado) |
| **Enlazar `/tal/` al index** | Intencionalmente NO hecho ("sin mostrar nada") |

---

## 4. Decisiones de arquitectura tomadas

1. **Notion = fuente de verdad** en Fase 1 (per §6). Las bases creadas son el sistema operativo inicial.
2. **Forms ocultos** (`noindex`) y **no enlazados** del home hasta que Lili apruebe el lanzamiento.
3. **Failsafe local** en forms: no se pierde un lead por falta de webhook.
4. **Oportunidades ya estructurada** con campos de matching (§11 + §13.2): deadline, nivel, área, nacionalidad, financiamiento, última verificación, estado, perfil recomendado. Esto deja preparado el futuro Opportunity Finder.

---

## 5. Próximos pasos sugeridos

1. **Conseguir webhooks n8n** (3: lead B2C, community waitlist, B2B) → cablear los forms.
2. **Crear bases restantes** §6.1: Clientes, Contrataciones, Sesiones, Entregables, Pagos, Seguimientos, Testimonios/Alumni, Asesoras.
3. **Vistas operativas** §6.3 (leads sin contactar, entregas atrasadas, pagos pendientes, etc.).
4. **GA4 + UTM estándar** §10.
5. Cuando Lili lo apruebe: enlazar `/tal/` al nav principal y lanzar.
