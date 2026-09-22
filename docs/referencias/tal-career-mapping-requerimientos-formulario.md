
THE ADMISSIONS LAB
Requerimientos del formularioCareer Mapping - Fase 1
Especificación funcional para desarrollo e integración con CRM
Objetivo: recopilar la información necesaria para diagnosticar el perfil profesional, definir mercados laborales internacionales y construir el Career Mapping personalizado del cliente.
The Admissions Lab · Internacionaliza tu perfil

1. Alcance funcional
El formulario debe: organizarse por etapas, utilizar lógica condicional, permitir carga de CV, limitar la selección a un máximo de tres países y enviar la información estructurada a la ficha del cliente en el CRM.
La experiencia del usuario debe ser simple, clara y visual; no debe mostrarse como una sola página extensa.
Las preguntas condicionales solo deben aparecer cuando correspondan.
El formulario debe poder almacenar información profesional, académica, internacional, lingüística y documental.
No se solicitarán inicialmente antecedentes penales, procesos judiciales, apostillas ni certificados laborales; estos se pedirán solo si el país, la profesión o la ruta migratoria lo requiere.
2. Datos personales
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
Nombre completo
	Texto
	Sí
	
	
Edad
	Número
	Sí
	
	
Nacionalidad
	Selector de país
	Sí
	
	
¿Tienes una segunda nacionalidad?
	Sí / No
	Sí
	Si responde Sí, mostrar “Segunda nacionalidad”.
	
Segunda nacionalidad
	Selector de país
	Condicional
	Solo si respondió Sí.
	
País de residencia actual
	Selector de país
	Sí
	
	
Ciudad de residencia
	Texto
	Sí
	
	
WhatsApp
	Teléfono
	Sí
	Con código de país.
	
Correo electrónico
	Email
	Sí
	
	

3. Objetivo profesional
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
Objetivo profesional internacional
	Selección única
	Sí
	Trabajo en otro país / remoto internacional / cambio de área / continuar en área actual / explorar / no está seguro.
	
Área o puesto de interés
	Texto abierto
	Sí
	Ej.: Marketing Digital, Project Management, Data Analytics, Customer Success.
	
¿Quieres continuar en un área relacionada con tu experiencia actual?
	Selección única
	Sí
	Sí / No / Abierto a explorar otras áreas.
	
Seniority objetivo
	Selección única
	No
	Internship, Junior, Analyst, Specialist, Mid-level, Senior, Manager, Head/Lead, Director, No está seguro.
	
Modalidad preferida
	Selección múltiple
	No
	Presencial / Híbrida / Remota / Sin preferencia.
	

4. Países de interés
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
Países donde le gustaría trabajar
	Selector múltiple
	Sí
	Máximo 3 países.
	
¿Consideraría otros países si identificamos mejores oportunidades?
	Sí / No
	Sí
	
	
Países que definitivamente no consideraría
	Selector múltiple / texto
	No
	
	

5. Timing
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
¿Cuándo desea iniciar su búsqueda internacional?
	Selección única
	Sí
	Inmediatamente / 3 meses / 3-6 meses / 6-12 meses / +1 año / Solo explorando.
	
¿Cuándo estaría dispuesto/a a mudarse?
	Selección única
	No
	Inmediatamente / 1-3 / 3-6 / 6-12 / +12 meses / Solo remoto.
	

6. Formación académica
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
Nivel máximo de estudios
	Selección única
	Sí
	Secundaria / Técnico / Bachiller / Título / Maestría / Doctorado / Otro.
	
Carrera / especialidad
	Texto
	Sí
	
	
Universidad / institución
	Texto
	Sí
	
	
País donde estudió
	Selector de país
	Sí
	
	
Año de finalización
	Año
	Sí
	
	
¿Cuenta con bachiller o grado?
	Selección
	No
	Sí / No / En trámite.
	
¿Cuenta con título profesional?
	Selección
	No
	Sí / No / En trámite / No aplica.
	
¿Cuenta con maestría?
	Selección
	No
	Sí / No / En curso.
	
Otros estudios o certificaciones relevantes
	Texto largo
	No
	Diplomados, especializaciones, cursos técnicos o acreditaciones.
	

7. Experiencia profesional
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
Años de experiencia laboral total
	Selección única
	Sí
	<1 / 1-2 / 3-5 / 6-10 / +10 años.
	
Años de experiencia en el área objetivo
	Selección única
	Sí
	Ninguna / <1 / 1-2 / 3-5 / 6-10 / +10 años.
	
Cargo actual o último cargo
	Texto
	Sí
	
	
Área principal de experiencia
	Texto
	Sí
	
	
Empresa actual o última empresa
	Texto
	Sí
	
	
¿Actualmente trabaja?
	Sí / No
	Sí
	
	
Principales funciones y experiencia
	Texto largo
	Sí
	Responsabilidades, proyectos y alcance.
	

8. Herramientas y skills
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
Principales habilidades profesionales
	Texto largo
	Sí
	Ej.: Project Management, ventas B2B, análisis de datos, gestión de clientes.
	
Herramientas o softwares que maneja
	Texto largo
	Sí
	Ej.: Excel, Power BI, Salesforce, HubSpot, SAP, SQL, Python, Figma.
	
¿Cuenta con certificaciones técnicas o profesionales?
	Sí / No
	No
	Si responde Sí, mostrar detalle.
	
Detalle de certificaciones
	Texto
	Condicional
	Solo si respondió Sí.
	

9. Idiomas
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
Idioma
	Selector repetible
	Sí
	Debe permitir agregar más de uno.
	
Nivel
	Selección única
	Sí
	A1 / A2 / B1 / B2 / C1 / C2 / Nativo / No conoce su nivel.
	
¿Cuenta con certificación oficial?
	Sí / No
	No
	Si responde Sí, mostrar certificación y puntaje.
	
Certificación
	Selección / texto
	Condicional
	IELTS / TOEFL / Cambridge / DELF / Goethe / Otro.
	
Puntaje o nivel obtenido
	Texto
	Condicional
	
	

10. Situación migratoria
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
¿Tiene permiso legal para trabajar en otro país?
	Sí / No / No sabe
	Sí
	Si responde Sí, solicitar país y tipo de permiso.
	
País(es) donde tiene autorización
	Selector múltiple
	Condicional
	
	
Tipo de permiso
	Texto
	Condicional
	Ciudadanía, residencia, visa de trabajo, permiso de estudiante, etc.
	
¿Cuenta con pasaporte vigente?
	Sí / No / En trámite
	Sí
	
	
¿Ha tenido visa de trabajo, residencia o estudios?
	Sí / No
	No
	Si responde Sí, solicitar país y tipo.
	
País y tipo de visa anterior
	Texto
	Condicional
	
	
¿Ha tenido algún rechazo de visa relevante?
	Sí / No
	No
	Si responde Sí, mostrar campo de explicación.
	
Detalle del rechazo
	Texto largo
	Condicional
	
	

11. Expectativas laborales
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
Expectativa salarial aproximada
	Texto
	No
	Rango mensual o anual + moneda.
	
Factores importantes al elegir una oportunidad
	Selección múltiple
	No
	Salario / visa sponsorship / remoto / crecimiento / empresa internacional / balance / migración / estabilidad / sector / otro.
	

12. LinkedIn y presencia profesional
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
URL de LinkedIn
	URL
	Si tiene
	
	
¿Tiene LinkedIn actualizado?
	Selección única
	No
	Sí / Parcialmente / No / No tiene LinkedIn.
	
¿Tiene un CV en inglés?
	Selección única
	No
	Sí / No / Tiene uno, pero necesita actualizarlo.
	

13. Documentos
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
Adjuntar CV actual
	Carga de archivo
	Sí
	PDF / DOC / DOCX.
	

14. Información adicional y consentimiento
Campo
	Tipo
	Obligatorio
	Notas / opciones
	
Información adicional relevante
	Texto largo
	No
	Cualquier situación que deba considerarse en el análisis.
	
Consentimiento de uso de información
	Checkbox
	Sí
	Autorización para utilizar la información exclusivamente para el Career Mapping y el servicio contratado.
	

15. Experiencia de usuario
El formulario debe mostrarse por etapas y con barra de progreso. Estructura sugerida:
Etapa
	Nombre
	Contenido
	
Paso 1
	Sobre ti
	Datos personales
	
Paso 2
	Tu objetivo
	Career + países
	
Paso 3
	Tu experiencia
	Formación + experiencia + skills
	
Paso 4
	Idiomas y movilidad
	Idiomas + migración
	
Paso 5
	Tu perfil profesional
	CV + LinkedIn
	
Paso 6
	Finalizar
	Información adicional + consentimiento
	
16. Lógica condicional
Condición
	Comportamiento esperado
	
Segunda nacionalidad
	Si responde Sí → mostrar selector “Segunda nacionalidad”.
	
Permiso de trabajo
	Si responde Sí → solicitar país(es) + tipo de permiso.
	
Certificación de idioma
	Si responde Sí → solicitar certificación + puntaje/nivel.
	
Certificación profesional
	Si responde Sí → solicitar detalle.
	
Visa previa
	Si responde Sí → solicitar país + tipo de visa.
	
Rechazo de visa
	Si responde Sí → habilitar campo de explicación.
	
17. Información que debe llegar al CRM
Datos personales: Nombre, Correo, WhatsApp, Nacionalidad, País/ciudad de residencia.
Career: Objetivo, Área, Cargo objetivo, Seniority, Experiencia, Cargo actual, Herramientas, Skills.
International: País 1, País 2, País 3, Apertura a otros países, Timing, Permiso de trabajo, Segunda nacionalidad.
Education: Nivel académico, Carrera, Universidad, Certificaciones.
Languages: Idioma, Nivel, Certificación.
Documents: CV, LinkedIn.
18. Campos internos de TAL
Estos campos no deben mostrarse al cliente; deben estar disponibles dentro de la ficha del CRM para seguimiento del equipo.
Campo interno
	Configuración sugerida
	
Asesora asignada
	Usuario / selector interno
	
Fecha de ingreso
	Fecha automática
	
Estado del servicio
	Formulario pendiente / recibido / en análisis / research / Reality Check / PPT en elaboración / revisión interna / sesión agendada / sesión realizada / entregable enviado / cerrado
	
Complejidad interna
	Baja / Media / Alta
	
Country Priority
	País prioritario / Alternativa 1 / Alternativa 2
	
Viabilidad general
	Alta / Media / Baja
	
Career Targets
	Campo interno para 3-5 cargos
	
Principales gaps
	Texto interno
	
Próximo servicio recomendado
	CV / LinkedIn / Cover Letter / Job Application Support / Interview Preparation / Skills / Otro
	
19. Mensaje final del formulario
¡Listo! Ya recibimos tu información. 🌎
Nuestro equipo utilizará tus respuestas y tu CV para analizar tu perfil, identificar mercados laborales compatibles y construir tu Career Mapping de manera personalizada.
Recuerda que el análisis no se realiza de manera genérica: evaluaremos tu experiencia, formación, idiomas, objetivos profesionales y situación particular para construir una ruta internacional alineada contigo.
The Admissions LabInternacionaliza tu perfil.
	
