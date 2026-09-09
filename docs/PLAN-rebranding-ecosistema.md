# Plan — Rebranding a *The Admissions Lab* + modelo de ecosistema

**Fecha:** 2026-09-09
**Autor:** Dev (asistente de Edwin)
**Estado:** documentación y planificación. Único cambio aplicado al sitio: **Fase 0** (webhook de producción en `forms-experience.html`). Nada más fue modificado.
**Última revisión:** 2026-09-09 — mockup verificado visualmente (§3.5) y spec del formulario TAL Career incorporado al repo.

---

## 0. Fuentes de este documento

| Fuente | Qué aporta | Dónde está |
|---|---|---|
| Audio de Edwin (8/9, 22:08) | "Lili me ha pedido varios cambios relacionados con el rebranding de la marca" | — |
| `Estrategia Completa de Lanzamiento.pdf` | Copy completo del producto **The Admissions Lab Experience** | `docs/referencias/Estrategia-Completa-de-Lanzamiento.pdf` |
| Mockup de homepage (9/9, 00:46) | Dirección visual y **modelo de ecosistema de 5 pilares** | `docs/referencias/homepage-ecosistema-lili.jpg` |
| Formulario **TAL Career** (9/9) | 23 bloques, ~50 campos, con carga de CV | `docs/referencias/formulario-tal-career.md` |
| `REVIEW-forms-experience.md` | Revisión de Zico del formulario (7/9) | raíz del repo |
| Auditoría propia del repo | Estado real del código | este documento |

> El mockup es **referencia, no especificación**. Edwin fue explícito: *"Tómalo como referencia solo."*

---

## 1. Estado actual del sitio

**Repo:** `edwinsantosv/lilsinlondon.github.io` · rama `main` · último commit `38a9467`
**Publicado en:** `lilsinlondon.com` (GitHub Pages, `CNAME`)

### 1.1 Arquitectura

`index.html` es **autocontenido**: todo el CSS va en un `<style>` inline y todo el JS también. **No usa `assets/css/main.css`.** Cualquier rediseño se hace dentro de ese archivo, no en la hoja externa.

### 1.2 Sistema de diseño ya existente

```css
--cream: #F7F4EF;   --cream-dark: #EDE8DF;
--black: #1C1C1C;   --gold: #C9A84C;    --gold-light: #E8D5A3;
--border: #DDD8CF;  --white: #FFFFFF;   --gray: #6B6B6B;
--serif: 'Playfair Display';  --sans: 'Inter';
```

**Esto es una buena noticia:** el mockup usa exactamente esta línea — crema, negro, dorado fino, serif editorial, labels en mayúsculas con tracking. **No hay que inventar un sistema visual nuevo, hay que extender el que ya existe.**

### 1.3 Secciones actuales del `index`

| Sección | Línea aprox. |
|---|---|
| `#hero` | 897 |
| `#stats` | 912 |
| `#services` | 940 |
| `#cases` | 980 |
| Carrusel de prensa | 1074 |
| `#team` | 1139 |
| `#contact` | 1197 |

### 1.4 Servicios actuales (5, en `#services`)

| # | Servicio | Página |
|---|---|---|
| 01 | Asesoría personalizada de becas | `asesoria_becas.html` |
| 02 | Búsqueda de universidades según tu presupuesto | `asesoria_integral.html` |
| 03 | Documentos de postulación | `docs-post.html` |
| 04 | Traducción de documentos | `traducciones.html` |
| 05 | Estudia inglés en Inglaterra | `cursos-ingles.html` |

### 1.5 Stats actuales

`550+` clientes satisfechos · `4500+` horas de asesoría · `3000+` becas recopiladas · `15` países

> ⚠️ El mockup muestra **`+650` personas asesoradas** y `15+` países. Si Lili quiere `650`, es un dato de negocio a confirmar, no un número que yo deba inventar.

### 1.6 Páginas huérfanas (existen pero **nada las enlaza**)

`estudios-alemania.html` · `toefl-ielts.html` · `forms.html` · `forms-docs.html` · `forms-experience.html` · `success.html` · `past.html` · `index-v2.html` · `portfolio-details.html` · `starter-page.html`

Diez archivos inalcanzables desde el sitio. Parte del trabajo es decidir cuáles se recuperan, cuáles se archivan y cuáles se borran.

---

## 2. Auditoría del rebranding

La marca ya cambió a **The Admissions Lab** en el nav y el hero (`nuevo_logo.png`), pero quedó a medio camino.

### 2.1 Aclaración importante que cambia el criterio

El logo del mockup dice literalmente:

> **THE ADMISSIONS LAB** — *By Lils in London*

Es decir, **"By Lils in London" se conserva como firma de respaldo, no se elimina.** Eso valida el footer actual (`The Admissions Lab · By Lils in London`) y el `<title>`. Retiro mi observación anterior de que eran "restos por limpiar": son parte del lockup de marca.

**Lo que sí hay que revisar** es dónde el sitio *habla de sí mismo* como "Lils in London" en cuerpo de texto, que es distinto de la firma.

### 2.2 Apariciones de la marca vieja

| Ubicación | Tipo | Acción sugerida |
|---|---|---|
| `index.html:6` — `<title>` | Firma de marca | ✅ Correcto, dejar |
| `index.html:1226` — footer | Firma de marca | ✅ Correcto, dejar |
| `index.html:1034` — testimonio Gabriela Sánchez | **Cita textual de clienta** | ⛔ No tocar sin permiso de Lili |
| `index.html:1061` — testimonio Guillermo Pilares | **Cita textual de clienta** | ⛔ No tocar sin permiso de Lili |
| 8 páginas internas | Nav/footer/copy | 🔧 Revisar y alinear |

**Páginas internas con marca vieja:** `asesoria_becas`, `asesoria_integral`, `cursos-ingles`, `docs-post`, `toefl-ielts`, `traducciones`, `forms`, `forms-docs`.

Estas páginas **nunca recibieron el rebranding**. Hoy un visitante que entra a un servicio desde el home ve otra marca en la misma sesión. Es la inconsistencia más visible del sitio.

### 2.3 Fuera del código

| Activo | Estado | Nota |
|---|---|---|
| Dominio `lilsinlondon.com` | Marca vieja | Cambiarlo = comprar dominio + DNS + redirects. **Decisión de negocio, no de repo.** |
| Correo `contactolilsinlondon@gmail.com` | Marca vieja | Abrir buzón nuevo. Decisión de negocio. |
| Instagram `@lils.29` / TikTok `@lils.299` | Marca vieja | Decisión de Lili. |

---

## 3. La visión nueva: modelo de ecosistema

El mockup propone un cambio **conceptual**, no cosmético: pasar de *"una asesoría con 5 servicios"* a *"un ecosistema con 5 pilares"*.

### 3.1 Los cinco pilares

| Pilar | Descripción (del mockup) | ¿Existe hoy? |
|---|---|---|
| **TAL Admissions** | Becas, másters y estrategia de postulación | ✅ Sí — es el 80% del sitio actual |
| **TAL Career** | Mapeo y acompañamiento para oportunidades internacionales | ❌ **No existe nada** |
| **TAL Translate** | Traducciones certificadas para procesos académicos y profesionales | ✅ Sí — `traducciones.html` |
| **TAL Lab** | Cursos prácticos en IA, Power BI, liderazgo y más | ❌ **No existe** (lo más cercano es inglés, que no encaja) |
| **TAL Community** | Acompañamiento, recursos y comunidad para impulsarte | ❌ **No existe nada** |

**Este es el hallazgo central del documento:** el mockup vende cinco líneas de negocio y **solo dos y media están construidas**. Publicar el ecosistema completo hoy sería prometer servicios que no existen.

### 3.2 Mapeo de servicios actuales a pilares

| Servicio actual | Pilar |
|---|---|
| Asesoría de becas | TAL Admissions |
| Búsqueda de universidades | TAL Admissions |
| Documentos de postulación | TAL Admissions |
| Traducción de documentos | TAL Translate |
| Estudia inglés en Inglaterra | ⚠️ Sin encaje limpio — ¿TAL Lab? ¿Admissions? |
| *The Admissions Lab Experience* (PDF) | ⚠️ Sin ubicación definida — ¿Admissions? ¿Community? |

Dos preguntas abiertas de arquitectura de producto que **solo Lili puede responder**.

### 3.3 Estructura de la homepage propuesta (según mockup)

1. **Nav** — `INICIO · ECOSISTEMA · SERVICIOS · CASOS DE ÉXITO · COMUNIDAD · CONTACTO` + botón `AGENDA`
   *(hoy: Servicios · Casos de Éxito · Equipo · Contacto — desaparece "Equipo", aparecen "Ecosistema" y "Comunidad")*
2. **Hero** — eyebrow *"MÁS QUE ADMISIÓN, UN FUTURO GLOBAL"* + titular *"Tu ecosistema para estudiar, crecer y proyectarte al mundo."* + 2 CTAs (`AGENDA TU ASESORÍA` / `EXPLORAR ECOSISTEMA →`) + **diagrama circular de 5 nodos** + foto lateral con overlay *"Un mundo de oportunidades te espera"*
3. **Nuestro ecosistema** — 5 tarjetas, una por pilar
4. **Cómo te acompañamos** — 4 pasos: `01 Explora` · `02 Diseña tu estrategia` · `03 Postula o crece` · `04 Conecta con la comunidad`
5. **Resultados que hablan** — métricas + testimonios cortos con foto
6. **Explora nuestros servicios** — 4 tarjetas con imagen de fondo

> Los testimonios del mockup (*María P.*, *Daniel R.*) son **placeholders del diseñador**. El sitio real ya tiene 9 testimonios reales con nombre y beca. Se usan esos.

### 3.4 La pieza técnica difícil

El **diagrama circular del hero** (globo central + 5 nodos con línea punteada) es lo único del mockup que no sale de extender el CSS actual. Opciones, de menor a mayor esfuerzo:

1. **SVG estático + responsive** → en móvil colapsa a lista vertical. *Recomendado.*
2. SVG con hover/animación de entrada.
3. Imagen exportada. Rápido pero no escala ni es accesible.

### 3.5 Verificación del mockup (2026-09-09, revisión visual directa)

Edwin reenvió el mockup y esta vez sí se pudo leer la imagen. **Todo lo descrito en 3.1–3.4 queda confirmado contra el original.** Detalles adicionales que solo se ven mirándolo:

- **Paleta:** fondo crema (`#F7F5F0` aprox.), texto casi negro, acento dorado/mostaza en `Lab`, en los enlaces `→` y en las comillas de los testimonios. Coincide con el sistema actual del sitio.
- **Tipografía:** serif alto contraste para titulares (compatible con Playfair) + sans neutra en mayúsculas espaciadas para eyebrows y nav.
- **Hero:** foto lateral con **recorte de esquina redondeada muy grande** (arco superior izquierdo), no un rectángulo. Sobre la foto, lista vertical en mayúsculas pequeñas: `PERSONAS · IDEAS · EDUCACIÓN · OPORTUNIDADES · SIN FRONTERAS`.
- **Diagrama:** globo terráqueo central con el lockup `THE ADMISSIONS LAB — By Lils in London`, 5 nodos circulares unidos por una circunferencia punteada fina. Cada nodo lleva un icono de línea.
- **Sección de servicios (la última visible):** solo **4 tarjetas** con foto de fondo y degradado oscuro — `Becas y admisiones`, `TAL Career`, `Traducciones certificadas`, `TAL Lab`. **TAL Community no aparece ahí.**

> ⚠️ **Inconsistencia del propio mockup:** los nodos del diagrama y las tarjetas del ecosistema **no usan los mismos nombres**.
>
> | Diagrama | Tarjeta |
> |---|---|
> | Estudios en el extranjero | TAL Admissions |
> | Traducciones certificadas | TAL Translate |
> | Comunidad | TAL Community |
> | TAL Career | TAL Career |
> | TAL Lab | TAL Lab |
>
> Hay que decidir una sola nomenclatura antes de construir: o todo con prefijo `TAL`, o todo descriptivo. Mezclarlo confunde. **Es decisión de Lili.**

---

## 4. The Admissions Lab Experience

Producto nuevo, con copy completo en el PDF y **precio propio (Early Bird S/210)**.

### 4.1 Qué existe

- ✅ `forms-experience.html` — formulario de reserva, terminado y decente (honeypot, estados de carga, accesibilidad razonable).
- ❌ **La landing no existe.** Las Sections 2–6 del PDF no están en ningún archivo.
- ❌ El formulario **no está enlazado desde ningún lado**. Es inalcanzable.
- ❌ Los CTAs del PDF (`[Quiero unirme a la próxima edición]`, `[Reservar mi cupo]`) no tienen dónde vivir.

### 4.2 Bloqueantes antes de publicar (de la revisión de Zico, 7/9)

1. **[Crítico]** `forms-experience.html:321` apunta a `webhook-test/registro-experience`. **En producción debe ser `webhook/registro-experience`.** Tal como está, las reservas reales caen a un flujo de prueba y se pierden.
2. **[Alto]** No hay validación real de correo — solo `type="email"`. Edwin lo pidió expresamente en la llamada del 7/9.
3. [Medio] El `fetch` solo mira `res.ok`, no valida el body.
4. [Bajo] Teléfono sin `pattern`.
5. [Bajo] `referral` parece obligatorio pero no lo es.

### 4.3 Asset faltante

El PDF pide `(foto tefi y lili)`. **No hay foto conjunta.** Sí existen por separado:
- `assets/img/team/liliane.jpeg`
- `assets/img/team/estefania.jpeg` — asumiendo que "Tefi" = **Estefanía Anticona** (figura en el sitio bajo *Partnerships*, como *Admissions Documentation Specialist*). **Confirmar.**

> ⚠️ El PDF dice que la Experience fue diseñada por *"dos profesionales egresadas de programas de máster en London, UK"*. El perfil público de Estefanía en el sitio no menciona un máster en Londres. Si va a aparecer como coautora con esa credencial, **su bio debe actualizarse para que el sitio no se contradiga**.

---

## 5. Deuda técnica y riesgos

| # | Asunto | Severidad |
|---|---|---|
| 1 | Webhook en modo test → se pierden reservas | 🔴 Crítico |
| 2 | Ecosistema promete 5 pilares, existen 2.5 | 🔴 Crítico (de negocio) |
| 3 | 8 páginas internas sin rebranding | 🟠 Alto |
| 4 | Sin validación real de correo | 🟠 Alto |
| 5 | 10 páginas huérfanas sin enlazar | 🟡 Medio |
| 6 | `index.html` monolítico (~50 KB, CSS+JS inline) | 🟡 Medio |
| 7 | `assets/img/features-bg.jpg` pesa **11 MB**; `hero-bg-large.jpg` **5.5 MB** | 🟡 Medio |
| 8 | `main.css` / `forms.css` son placeholders de OneDrive (ilegibles en disco) | 🟡 Medio |
| 9 | Git dentro de OneDrive — patrón que ya corrompió un historial de Edwin | 🟡 Medio |
| 10 | Cualquier `.md` commiteado a la raíz es **públicamente accesible** en `lilsinlondon.com` | 🟡 Medio |
| 11 | `forms/contact.php` y `forms/newsletter.php` no funcionan en GitHub Pages (sin PHP) | 🟢 Bajo |

**Sobre el #7:** hay ~17 MB en dos imágenes de fondo. En móvil con datos eso es una salida garantizada del visitante. Optimizarlas es de las mejoras de mayor retorno por menor esfuerzo de toda la lista.

**Sobre el #9:** OneDrive puede pisar el `.git` a mitad de una operación. Antes de cualquier cosa destructiva (`reset --hard`, `rebase`, `clean`) → copia primero.

---

## 6. Plan por fases

Ordenado por **riesgo evitado ÷ esfuerzo**, no por vistosidad.

### Fase 0 — Parar la fuga (1 cambio, minutos)

- [x] `forms-experience.html:321` → `webhook-test` → `webhook` ✅ **hecho 2026-09-09** (sin commitear todavía)

**Por qué primero:** es una línea y es la diferencia entre capturar o perder cada reserva. No depende de ninguna decisión de diseño.

> Pendiente de confirmar con Edwin: que el flujo de producción `webhook/registro-experience` esté **activo** en n8n. Apuntar a un webhook de producción apagado pierde igual las reservas (decisión #10).

### Fase 1 — Consistencia de marca (bajo riesgo, alto impacto percibido)

- [ ] Alinear nav, footer y copy de las 8 páginas internas al lockup *The Admissions Lab / By Lils in London*
- [ ] Verificar que el logo nuevo esté en todas
- [ ] **No tocar los testimonios** hasta que Lili decida
- [ ] Comprimir `features-bg.jpg` y `hero-bg-large.jpg`

### Fase 2 — Landing de la Experience (primer entregable visible)

- [ ] `experience.html` con las 6 secciones del PDF, reusando el sistema visual actual
- [ ] Enlazar los dos CTAs a `forms-experience.html`
- [ ] Entrada en el nav del `index`
- [ ] Bloque de autoría con Lili + Tefi
- [ ] Validación real de correo en el formulario

**Por qué antes del rediseño:** es un producto con fecha de lanzamiento y precio. El rediseño del home no tiene deadline. Además `experience.html` sirve de **prototipo del lenguaje visual nuevo** en una página aislada, sin riesgo para el home que ya convierte.

### Fase 3 — Homepage de ecosistema (la pieza grande)

- [ ] Diagrama SVG de 5 nodos
- [ ] Sección "Nuestro ecosistema"
- [ ] Sección "Cómo te acompañamos" (4 pasos)
- [ ] Rehacer "Resultados que hablan" con los testimonios reales
- [ ] Rehacer "Explora nuestros servicios" con tarjetas de imagen
- [ ] Nav nuevo

**Precondición dura:** que existan TAL Career, TAL Lab y TAL Community, aunque sea como página de "próximamente" honesta. **No publicar pilares vacíos.**

### Fase 3.5 — Formulario TAL Career

Spec completo en [`docs/referencias/formulario-tal-career.md`](referencias/formulario-tal-career.md).

- [ ] Resolver el upload del CV → n8n (**bloqueante duro**, ver notas del spec)
- [ ] `forms-career.html` — 23 bloques, por pasos y no en scroll infinito
- [ ] 8 ramas condicionales + límites de selección forzados en JS
- [ ] Repetidor de idiomas + lista de países
- [ ] Nota de tratamiento de datos junto al checkbox de confirmación

**Dependencia de producto:** este formulario es la puerta de entrada de **TAL Career**, uno de los pilares que hoy no existe. Construir el formulario antes de que el servicio exista es poner un mostrador sin tienda detrás. Va después —o a la par— de la decisión #2.

### Fase 4 — Limpieza

- [ ] Decidir destino de las 10 páginas huérfanas
- [ ] Retirar `forms/*.php` muertos
- [ ] Evaluar extraer CSS/JS del `index`

---

## 7. Decisiones pendientes (no las puedo tomar yo)

| # | Pregunta | Quién decide |
|---|---|---|
| 1 | ¿Los testimonios de Gabriela y Guillermo se reescriben a "The Admissions Lab" o se respetan textuales? | Lili |
| 2 | ¿TAL Career, TAL Lab y TAL Community son productos reales con fecha, o aspiracionales? | Lili |
| 3 | ¿Dónde encaja "Estudia inglés en Inglaterra" en los 5 pilares? | Lili |
| 4 | ¿La Experience es parte de TAL Admissions, de TAL Community, o pilar propio? | Lili |
| 5 | ¿El stat pasa de `550+` a `+650`? ¿Es real? | Lili |
| 6 | ¿Se cambia el dominio `lilsinlondon.com`? | Edwin + Lili |
| 7 | ¿"Tefi" es Estefanía Anticona? ¿Tiene máster en Londres? | Edwin |
| 8 | ¿Desaparece "Equipo" del nav, como sugiere el mockup? | Lili |
| 9 | ¿Se limpian las erratas del PDF (`inmersiva,,`, `Mitos y errores comunes o.`) o Lili revisa el copy? | Lili |
| 10 | ¿El webhook de producción de n8n ya está activo? | Edwin |
| 11 | Nomenclatura: ¿todo con prefijo `TAL` o todo descriptivo? El mockup mezcla las dos (§3.5) | Lili |
| 12 | ¿Existe flujo de n8n para TAL Career? ¿Dónde aterriza el CV en PDF? | Edwin |

---

## 8. Recomendación

Empezar por **Fase 0 + Fase 2**: arreglar el webhook y construir `experience.html`.

Es el camino con más valor y menos riesgo: hay un producto con precio y fecha esperando página, la landing sirve de laboratorio para el lenguaje visual nuevo, y no se toca el home que hoy funciona.

El rediseño de ecosistema (Fase 3) **no debería arrancar hasta que estén respondidas las preguntas 2, 3 y 4**. Construir cinco pilares donde hay dos y medio es un problema de producto, no de código, y se resuelve hablando con Lili, no escribiendo HTML.
