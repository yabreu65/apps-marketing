import type {
  LeadDiagnosisGoal,
  LeadDiagnosisStage,
  LeadDiagnosisUrgency,
} from '@/types/lead';
import type { RecommendedSolution } from '@/types/diagnosis';

export type DiagnosisResponseCopy = {
  recommendation: RecommendedSolution;
  displayTitle?: string;
  situation: string;
  nextStep: string;
  avoid: string;
  note?: string;
};

type DiagnosisKey = `${LeadDiagnosisGoal}:${LeadDiagnosisStage}`;

type BaseDiagnosisResponseCopy = Omit<DiagnosisResponseCopy, 'note'>;

const diagnosisBaseCopyByGoalStage: Record<DiagnosisKey, BaseDiagnosisResponseCopy> = {
  'leads:idea': {
    recommendation: 'Landing comercial',
    displayTitle: 'Landing para validar demanda',
    situation:
      'Todavía estás ordenando la idea, así que lo más importante es comprobar si el mensaje, la oferta y el canal generan consultas reales antes de construir una web más grande.',
    nextStep:
      'Empezaría por una landing simple con una promesa clara, beneficios concretos, preguntas frecuentes y un formulario corto. Eso permite medir qué entiende la gente, qué pregunta y qué objeciones aparecen.',
    avoid:
      'Evitaría invertir de entrada en muchas páginas, blog o automatizaciones. En esta etapa necesitás evidencia comercial, no una estructura pesada.',
  },
  'leads:running': {
    recommendation: 'Landing comercial',
    displayTitle: 'Landing enfocada en consultas',
    situation:
      'El negocio ya está funcionando, pero si las consultas dependen de conversaciones sueltas, necesitás una página que concentre la propuesta y convierta mejor el interés existente.',
    nextStep:
      'Primero elegiría una oferta principal, ordenaría los argumentos de venta y pondría un CTA único hacia formulario. Después mediría qué mensajes generan más consultas y cuáles filtran mejor al cliente correcto.',
    avoid:
      'Evitaría una web institucional llena de secciones genéricas. Si el objetivo es captar, cada bloque tiene que empujar a una acción concreta.',
  },
  'leads:manual': {
    recommendation: 'Landing comercial',
    displayTitle: 'Captación clara antes de automatizar',
    situation:
      'Tenés clientes y movimiento, pero el proceso manual puede estar haciendo que las consultas entren sin contexto o se pierdan entre mensajes.',
    nextStep:
      'Primero pondría una landing que pida la información mínima útil: tipo de necesidad, prioridad, contacto y mensaje. Con eso las consultas llegan más ordenadas y después se puede decidir qué parte automatizar.',
    avoid:
      'Evitaría sumar bots o paneles antes de ordenar la entrada de información. Automatizar desorden solo hace que el desorden llegue más rápido.',
  },
  'leads:noconvert': {
    recommendation: 'Landing comercial',
    displayTitle: 'Replanteo de conversión',
    situation:
      'Si ya tenés una web pero no convierte, el problema probablemente no es solo visual: puede faltar claridad en la oferta, prueba de confianza o un próximo paso fácil.',
    nextStep:
      'Revisaría título, propuesta, objeciones, CTA, formulario y recorrido mobile. Luego armaría una landing con menos distracciones y más foco en la consulta correcta.',
    avoid:
      'Evitaría agregar más contenido encima de una estructura que no convierte. Primero hay que corregir mensaje y jerarquía.',
  },
  'leads:scale': {
    recommendation: 'Landing comercial',
    displayTitle: 'Base de conversión para escalar',
    situation:
      'Querés crecer, pero antes de empujar más tráfico necesitás una página que convierta de forma consistente y te ayude a distinguir consultas buenas de consultas débiles.',
    nextStep:
      'Construiría una landing con una oferta clara, formulario breve, medición básica y mensajes pensados para campañas. Así podés aumentar volumen sin perder control sobre la calidad de las consultas.',
    avoid:
      'Evitaría invertir más en pauta o contenido si la página todavía no explica bien por qué elegirte y qué hacer después.',
  },

  'web:idea': {
    recommendation: 'Sitio web profesional',
    displayTitle: 'Web inicial con base comercial',
    situation:
      'Estás en una etapa inicial y necesitás que el negocio se entienda rápido: qué hacés, para quién, qué problema resolvés y cómo contactarte.',
    nextStep:
      'Primero definiría la estructura mínima: inicio, servicios, confianza, preguntas frecuentes y contacto. La web debe dejar claro el valor sin obligar al visitante a escribir para entender lo básico.',
    avoid:
      'Evitaría arrancar con una web grande o demasiado técnica. Si todavía estás validando, conviene una presencia profesional, liviana y fácil de ajustar.',
  },
  'web:running': {
    recommendation: 'Sitio web profesional',
    displayTitle: 'Web profesional para ordenar la presencia',
    situation:
      'El negocio funciona, pero si la información está repartida entre Instagram, WhatsApp y mensajes manuales, la confianza depende demasiado de que vos expliques todo cada vez.',
    nextStep:
      'Organizaría servicios, diferenciales, proceso de trabajo y contacto en una web clara. El objetivo es que la persona llegue más informada y que tus conversaciones comerciales arranquen mejor.',
    avoid:
      'Evitaría una web que sea solo una tarjeta digital. Tiene que reducir dudas, no sumar otra pieza decorativa.',
  },
  'web:manual': {
    recommendation: 'Sitio web profesional',
    displayTitle: 'Web para reducir preguntas repetidas',
    situation:
      'Tenés operación real, pero si cada interesado pregunta lo mismo, una parte del problema es que la web todavía no está filtrando ni educando.',
    nextStep:
      'Crearía una web con información práctica: servicios, alcance, requisitos, tiempos, preguntas frecuentes y formulario con contexto. Eso baja trabajo manual y mejora la calidad de cada consulta.',
    avoid:
      'Evitaría automatizar respuestas antes de tener una fuente clara de información. La web debe ser la base que ordena la conversación.',
  },
  'web:noconvert': {
    recommendation: 'Sitio web profesional',
    displayTitle: 'Rediseño web orientado a confianza',
    situation:
      'Tu web existe, pero si no convierte puede estar fallando en confianza, claridad o recorrido. El visitante quizás entiende algo, pero no encuentra una razón suficiente para avanzar.',
    nextStep:
      'Reharía la arquitectura de contenido: mensaje principal, secciones de prueba, explicación del servicio y CTA visible. También revisaría mobile, porque ahí suelen perderse muchas consultas.',
    avoid:
      'Evitaría cambiar solo colores o estética. Si el problema es conversión, el rediseño tiene que corregir contenido y decisión de compra.',
  },
  'web:scale': {
    recommendation: 'Sitio web profesional',
    displayTitle: 'Web preparada para crecimiento',
    situation:
      'Para escalar, tu web tiene que soportar más tráfico, más servicios y más decisiones sin volverse confusa.',
    nextStep:
      'Plantearía una estructura escalable con páginas claras por servicio, formularios segmentados y base SEO. La idea es que cada tipo de visitante encuentre rápido su camino.',
    avoid:
      'Evitaría seguir dependiendo solo de redes sociales. Cuando querés escalar, necesitás un activo propio que ordene la demanda.',
  },

  'system:idea': {
    recommendation: 'Sistema web a medida',
    displayTitle: 'Sistema inicial para ordenar operación',
    situation:
      'La idea apunta a ordenar procesos, pero todavía hay que separar qué es necesidad real y qué sería complejidad prematura.',
    nextStep:
      'Primero mapearía el flujo operativo principal: quién carga información, quién la usa, qué estados existen y qué decisión mejora con el sistema. Con eso se define un primer módulo útil.',
    avoid:
      'Evitaría diseñar un sistema completo desde supuestos. Un sistema a medida funciona mejor cuando parte de un proceso concreto y repetido.',
  },
  'system:running': {
    recommendation: 'Sistema web a medida',
    displayTitle: 'Sistema para centralizar procesos',
    situation:
      'El negocio ya se mueve, pero seguramente hay datos repartidos en planillas, chats o herramientas que no conversan entre sí.',
    nextStep:
      'Identificaría el proceso más costoso —por ejemplo seguimiento, pedidos, clientes, tareas o reportes— y construiría un sistema que centralice esa información primero.',
    avoid:
      'Evitaría querer reemplazar todas las herramientas en una sola entrega. Lo inteligente es atacar el cuello de botella más caro.',
  },
  'system:manual': {
    recommendation: 'Dashboard / panel interno',
    displayTitle: 'Panel interno para dejar de operar a ciegas',
    situation:
      'Tenés clientes, pero los procesos manuales hacen que dependas de memoria, chats o planillas. Eso aumenta errores y hace difícil saber qué está pendiente.',
    nextStep:
      'Empezaría por un panel que muestre clientes, estados, tareas y próximos pasos. Antes de automatizar, necesitás visibilidad y una forma común de trabajar.',
    avoid:
      'Evitaría una suite completa de gestión si todavía no está claro qué indicadores y estados necesitás controlar cada semana.',
  },
  'system:noconvert': {
    recommendation: 'Sistema web a medida',
    displayTitle: 'Sistema para conectar captación y seguimiento',
    situation:
      'Si la web no convierte y además el seguimiento es desordenado, el problema no termina en la página: también falta continuidad después de la consulta.',
    nextStep:
      'Revisaría cómo entra una consulta, qué datos se guardan, quién responde y cómo se mide el avance. A partir de eso se puede diseñar un flujo web + panel interno.',
    avoid:
      'Evitaría optimizar solo el front de la página mientras las oportunidades se siguen perdiendo por falta de seguimiento.',
  },
  'system:scale': {
    recommendation: 'Sistema web a medida',
    displayTitle: 'Sistema modular para escalar operación',
    situation:
      'Para crecer sin caos, necesitás que la operación no dependa de una sola persona ni de procesos informales.',
    nextStep:
      'Definiría módulos por prioridad: gestión principal, estados, roles, reportes y alertas. La arquitectura debe permitir sumar funcionalidades sin rehacer el sistema.',
    avoid:
      'Evitaría escalar equipo o demanda sin una fuente única de información. Más volumen sobre procesos manuales suele multiplicar errores.',
  },

  'saas:idea': {
    recommendation: 'MVP SaaS',
    displayTitle: 'MVP SaaS para validar la idea',
    situation:
      'Estás en una etapa donde lo más importante no es construir una plataforma completa, sino validar si la idea resuelve un problema real para usuarios concretos.',
    nextStep:
      'Primero definimos el usuario, el problema principal y el flujo mínimo que debe funcionar. Luego construimos una primera versión enfocada en aprender rápido, sin cargar el producto con funciones secundarias.',
    avoid:
      'Evitaría empezar con demasiadas pantallas, automatizaciones o módulos avanzados antes de validar el uso real. En un MVP, menos ruido y más aprendizaje.',
  },
  'saas:running': {
    recommendation: 'MVP SaaS',
    displayTitle: 'MVP SaaS basado en señales reales',
    situation:
      'Ya hay una actividad o mercado en marcha, así que el MVP no debería salir de la imaginación: debería convertir lo que ya ocurre manualmente en una experiencia usable.',
    nextStep:
      'Tomaría el caso de uso más repetido, definiría roles, flujo principal y métrica de éxito. La primera versión debe probar si los usuarios vuelven y completan la tarea clave.',
    avoid:
      'Evitaría construir funciones “por si acaso”. Si no ayudan a validar adopción o valor, quedan fuera del MVP inicial.',
  },
  'saas:manual': {
    recommendation: 'MVP SaaS',
    displayTitle: 'MVP SaaS desde un proceso manual probado',
    situation:
      'Tener procesos manuales puede ser una ventaja: significa que ya existe una forma de resolver el problema y ahora hay que convertirla en producto.',
    nextStep:
      'Elegiría el flujo manual que más se repite, lo transformaría en pantallas simples y mediría si el usuario puede completar la tarea sin asistencia.',
    avoid:
      'Evitaría automatizar todos los casos especiales. El MVP debe cubrir el flujo común, no cada excepción del negocio.',
  },
  'saas:noconvert': {
    recommendation: 'MVP SaaS',
    displayTitle: 'MVP SaaS con propuesta más clara',
    situation:
      'Si hoy no convierte, puede que el problema no sea solo producto: quizás el usuario todavía no entiende con claridad qué gana o por qué debería probarlo.',
    nextStep:
      'Ajustaría primero el problema, la promesa y el flujo principal. Después construiría una versión mínima que permita probar valor con usuarios reales.',
    avoid:
      'Evitaría sumar features para compensar una propuesta débil. Más producto no arregla un mensaje que todavía no conecta.',
  },
  'saas:scale': {
    recommendation: 'MVP SaaS',
    displayTitle: 'MVP SaaS preparado para evolucionar',
    situation:
      'Querés escalar, pero antes hay que asegurar que el núcleo del producto está probado y puede crecer sin deuda innecesaria.',
    nextStep:
      'Revisaría qué parte del producto ya genera valor, qué flujo debe robustecerse y qué métricas muestran tracción. Desde ahí se define la siguiente versión.',
    avoid:
      'Evitaría escalar arquitectura, equipo o funcionalidades sin evidencia de uso. Primero consolidar, después expandir.',
  },

  'automation:idea': {
    recommendation: 'Automatización comercial',
    displayTitle: 'Automatización simple para probar eficiencia',
    situation:
      'Querés automatizar, pero si el proceso todavía está verde, conviene empezar con tareas pequeñas y medibles.',
    nextStep:
      'Detectaría una tarea repetitiva concreta: confirmaciones, recordatorios, clasificación de consultas o envío de información básica. La automatización debe ahorrar tiempo sin quitar control.',
    avoid:
      'Evitaría automatizar decisiones importantes antes de tener criterios claros. Primero tareas repetidas, después lógica más avanzada.',
  },
  'automation:running': {
    recommendation: 'Automatización comercial',
    displayTitle: 'Automatización para responder y seguir mejor',
    situation:
      'El negocio ya funciona y seguramente hay puntos donde se pierde tiempo: responder lo mismo, recordar seguimientos o mover información entre herramientas.',
    nextStep:
      'Priorizamos una automatización que reduzca fricción comercial: captura ordenada, respuestas iniciales, recordatorios o derivación interna.',
    avoid:
      'Evitaría conectar muchas herramientas sin dueño operativo. Una automatización útil necesita reglas simples y alguien que supervise.',
  },
  'automation:manual': {
    recommendation: 'Automatización comercial',
    displayTitle: 'Automatización por fases sobre procesos manuales',
    situation:
      'Hoy el trabajo manual probablemente sostiene la operación, pero también limita velocidad, consistencia y seguimiento.',
    nextStep:
      'Primero documento el proceso real: entrada, decisión, respuesta, seguimiento y cierre. Después automatizo los pasos repetidos sin tocar todavía lo que requiere criterio humano.',
    avoid:
      'Evitaría automatizar todo de una vez. Si una parte del proceso todavía cambia mucho, conviene mantenerla humana hasta estabilizarla.',
  },
  'automation:noconvert': {
    recommendation: 'Automatización comercial',
    displayTitle: 'Automatización para no perder oportunidades',
    situation:
      'Si hay consultas pero no convierten, puede haber demora, falta de seguimiento o respuestas poco consistentes.',
    nextStep:
      'Implementaría un flujo que capture datos mínimos, confirme recepción y recuerde seguimientos. La meta es que ninguna consulta con intención quede olvidada.',
    avoid:
      'Evitaría automatizar respuestas genéricas sin mejorar el mensaje comercial. La velocidad ayuda, pero la calidad de la respuesta sigue importando.',
  },
  'automation:scale': {
    recommendation: 'Automatización comercial',
    displayTitle: 'Automatización para sostener volumen',
    situation:
      'Si querés escalar, el seguimiento manual se vuelve cuello de botella. Más consultas sin sistema termina en demoras y oportunidades perdidas.',
    nextStep:
      'Diseñaría automatizaciones para clasificar, priorizar y recordar acciones comerciales. Así el equipo se enfoca en conversaciones de mayor valor.',
    avoid:
      'Evitaría aumentar captación sin automatizar el seguimiento mínimo. Crecer sin control suele empeorar la experiencia del cliente.',
  },

  'ai:idea': {
    recommendation: 'Automatización comercial',
    displayTitle: 'IA por fases, empezando por proceso',
    situation:
      'Querés aplicar IA, pero si el proceso todavía no está claro, la IA puede terminar respondiendo sobre una base confusa.',
    nextStep:
      'Primero definiría qué preguntas se repiten, qué información debe usar el asistente y cuándo debe pedir intervención humana. Después se prueba IA en un caso acotado.',
    avoid:
      'Evitaría lanzar un asistente inteligente sin contenido, reglas y límites. La IA necesita contexto confiable para ayudar de verdad.',
  },
  'ai:running': {
    recommendation: 'IA aplicada al negocio (fase avanzada)',
    displayTitle: 'IA aplicada a casos concretos del negocio',
    situation:
      'El negocio ya está en marcha, así que la IA puede aportar si se aplica a tareas específicas: atención inicial, resumen, clasificación o soporte interno.',
    nextStep:
      'Elegiría un caso de uso con impacto medible, definiría fuentes de información y diseñaría un flujo con revisión humana. La IA debe mejorar velocidad sin perder criterio.',
    avoid:
      'Evitaría usar IA como reemplazo total de atención o decisión comercial. Es mejor usarla como copiloto controlado.',
  },
  'ai:manual': {
    recommendation: 'Automatización comercial',
    displayTitle: 'Sistema + asistente inteligente por etapas',
    situation:
      'Hay procesos manuales que deben ordenarse antes de escalar IA avanzada. Si no existe flujo claro, la IA no sabe qué priorizar ni cuándo derivar.',
    nextStep:
      'Primero ordenaría entradas, estados y respuestas frecuentes. Luego sumaría automatización y, si tiene sentido, un asistente inteligente para orientar consultas o resumir información.',
    avoid:
      'Evitaría saltar directo a IA avanzada. Sin proceso, datos y límites, la IA puede generar más ruido que ayuda.',
  },
  'ai:noconvert': {
    recommendation: 'Automatización comercial',
    displayTitle: 'Automatización antes de IA avanzada',
    situation:
      'Si la conversión falla, la IA no debería ser el primer parche. Antes hay que mejorar mensaje, velocidad de respuesta y seguimiento.',
    nextStep:
      'Revisaría dónde se pierde la consulta: página, formulario, respuesta inicial o seguimiento. Después automatizaría el punto más débil y dejaría IA para una fase posterior.',
    avoid:
      'Evitaría pensar que un chat inteligente arregla una propuesta poco clara. Primero claridad comercial, después IA.',
  },
  'ai:scale': {
    recommendation: 'IA aplicada al negocio (fase avanzada)',
    displayTitle: 'IA aplicada para escalar atención y operación',
    situation:
      'Si ya tenés volumen y querés escalar, la IA puede ayudar a responder, resumir, priorizar y asistir decisiones repetitivas.',
    nextStep:
      'Definiría casos de uso por impacto: atención inicial, priorización de consultas, resúmenes internos o soporte comercial. Cada caso debe tener datos, límites y métricas.',
    avoid:
      'Evitaría desplegar muchas automatizaciones IA al mismo tiempo. Sin gobernanza, es difícil saber qué funciona y qué genera riesgo.',
  },

  'unsure:idea': {
    recommendation: 'Sitio web profesional',
    displayTitle: 'Diagnóstico comercial + base digital inicial',
    situation:
      'Si todavía no sabés qué necesitás, lo más útil es crear claridad: oferta, público, problema y próximo paso.',
    nextStep:
      'Empezaría con una estructura simple para explicar el negocio y validar qué despierta interés. Eso puede ser una web inicial o landing según la oferta.',
    avoid:
      'Evitaría decidir por moda: IA, sistema o automatización solo tienen sentido cuando ya sabemos qué problema resuelven.',
  },
  'unsure:running': {
    recommendation: 'Sitio web profesional',
    displayTitle: 'Diagnóstico comercial para elegir el camino',
    situation:
      'El negocio funciona, pero falta decidir qué mejora genera más impacto: presencia, captación, seguimiento u operación.',
    nextStep:
      'Revisaría de dónde vienen las consultas, qué se repite, dónde se pierde tiempo y qué objetivo comercial pesa más. Con eso se elige una primera solución concreta.',
    avoid:
      'Evitaría abrir varios frentes a la vez. Si todo parece prioridad, nada se implementa bien.',
  },
  'unsure:manual': {
    recommendation: 'Sistema web a medida',
    displayTitle: 'Orden operativo antes de crecer',
    situation:
      'Aunque no tengas claro el tipo de solución, los procesos manuales indican que hay una necesidad de orden y visibilidad.',
    nextStep:
      'Mapearía tareas, responsables, datos y estados. Después definimos si conviene panel interno, sistema simple o automatización puntual.',
    avoid:
      'Evitaría contratar una solución cerrada sin entender tu flujo real. Podría obligarte a adaptar el negocio a la herramienta.',
  },
  'unsure:noconvert': {
    recommendation: 'Landing comercial',
    displayTitle: 'Primero corregir conversión',
    situation:
      'Si no sabés por dónde empezar y la web no convierte, la prioridad es hacer que el mensaje y el CTA funcionen.',
    nextStep:
      'Analizaría qué entiende el visitante, qué objeciones quedan sin responder y qué acción debería tomar. Luego simplificaría la página para convertir mejor.',
    avoid:
      'Evitaría sumar sistemas, IA o automatizaciones antes de resolver el punto donde se pierde la decisión comercial.',
  },
  'unsure:scale': {
    recommendation: 'MVP SaaS',
    displayTitle: 'Ruta de crecimiento con solución mínima',
    situation:
      'Querés crecer, pero todavía falta decidir si el próximo paso es producto, sistema, captación o automatización.',
    nextStep:
      'Definiría una hipótesis principal de crecimiento y una solución mínima para probarla. Si hay potencial de producto, un MVP puede ser mejor que una mejora aislada.',
    avoid:
      'Evitaría invertir en una plataforma grande sin una hipótesis clara de uso, adquisición y aprendizaje.',
  },
};

const urgencyNote: Record<LeadDiagnosisUrgency, string> = {
  now: 'Como querés avanzar este mes, conviene recortar alcance: elegir una prioridad, definir entregables concretos y evitar funcionalidades que no impacten en la primera decisión comercial.',
  soon: 'Como tu plazo es de 2 a 3 meses, conviene avanzar por etapas: diagnóstico inicial, definición del flujo principal, implementación y validación con usuarios o consultas reales.',
  explore: 'Como estás explorando, lo mejor es usar esta etapa para comparar opciones, validar supuestos y evitar una inversión grande antes de confirmar qué problema vale resolver primero.',
};

type DiagnosisOverrideKey =
  `${LeadDiagnosisGoal}:${LeadDiagnosisStage}:${LeadDiagnosisUrgency}`;

const diagnosisCriticalOverrides: Partial<Record<DiagnosisOverrideKey, DiagnosisResponseCopy>> = {
  'unsure:idea:now': {
    recommendation: 'Sitio web profesional',
    displayTitle: 'Diagnóstico comercial + base digital inicial',
    situation:
      'Todavía estás definiendo el camino, pero si querés avanzar este mes necesitás una base clara para captar contexto real de clientes cuanto antes.',
    nextStep:
      'Haría un diagnóstico comercial corto (oferta, público, objeciones y canal principal) y lo convertiría en una web inicial muy enfocada. El objetivo es salir rápido con un mensaje entendible y una acción clara.',
    avoid:
      'Evitaría abrir frentes técnicos grandes sin tener claridad comercial mínima. Cuando hay urgencia y dudas, la simplicidad bien ejecutada rinde más.',
    note:
      'Por urgencia alta, conviene concentrarse en una sola meta de las próximas semanas: claridad de propuesta + entrada ordenada de consultas.',
  },
  'saas:idea:soon': {
    recommendation: 'MVP SaaS',
    displayTitle: 'MVP SaaS para validar la idea',
    situation:
      'Estás en una etapa donde lo más importante no es construir una plataforma completa, sino validar si la idea resuelve un problema real para usuarios concretos.',
    nextStep:
      'Primero definimos el usuario, el problema principal y el flujo mínimo que debe funcionar. Luego construimos una primera versión enfocada en aprender rápido, sin cargar el producto con funciones secundarias.',
    avoid:
      'Evitaría empezar con demasiadas pantallas, automatizaciones o módulos avanzados antes de validar el uso real. En un MVP, menos ruido y más aprendizaje.',
    note:
      'Como tu plazo es de 2 a 3 meses, conviene avanzar por etapas: alcance inicial, diseño del flujo principal, desarrollo de la primera versión y validación con usuarios reales.',
  },
  'ai:manual:now': {
    recommendation: 'Automatización comercial',
    displayTitle: 'Sistema + asistente inteligente por etapas',
    situation:
      'Querés aplicar IA con urgencia, pero hoy el principal riesgo es que los procesos manuales todavía no están suficientemente ordenados para escalar IA sin errores.',
    nextStep:
      'En el corto plazo priorizaría ordenar entradas, estados y respuestas frecuentes. Con esa base, activaríamos automatizaciones simples y recién después un asistente inteligente con límites claros.',
    avoid:
      'Evitaría lanzar IA avanzada “de una” para todo el flujo. Eso suele generar respuestas inconsistentes, retrabajo y pérdida de control operativo.',
    note:
      'Como querés resolverlo este mes, conviene dividir en dos entregables: orden operativo mínimo primero y capa de asistencia inteligente después.',
  },
  'leads:noconvert:now': {
    recommendation: 'Landing comercial',
    displayTitle: 'Rescate rápido de conversión',
    situation:
      'Tu prioridad no es sumar más secciones, sino corregir rápido por qué el visitante no está avanzando a consulta.',
    nextStep:
      'Haría una revisión de impacto inmediato: propuesta principal, prueba de confianza, CTA y formulario en mobile. Luego publicaría una landing más directa para recuperar conversión en semanas, no en meses.',
    avoid:
      'Evitaría rediseños largos o cambios cosméticos sin foco en conversiones. Con urgencia alta, primero mejora comercial tangible.',
    note:
      'En este mes, el éxito se mide en más consultas útiles y mejor tasa de avance, no en cantidad de páginas nuevas.',
  },
  'system:manual:soon': {
    recommendation: 'Dashboard / panel interno',
    displayTitle: 'Panel interno para ordenar operación',
    situation:
      'Tenés clientes y procesos manuales; en los próximos 2 a 3 meses podés ganar mucho si primero logramos visibilidad y disciplina operativa.',
    nextStep:
      'Comenzaría con un panel de seguimiento (estados, responsables, pendientes y prioridades) y una rutina de uso semanal. Después, sobre ese flujo ordenado, evaluaríamos qué automatizar.',
    avoid:
      'Evitaría saltar directo a un sistema completo sin validar antes que el equipo use un flujo común y medible.',
    note:
      'Con este plazo, el enfoque recomendado es: orden operativo en la primera fase y mejoras de eficiencia en la segunda.',
  },
};

export function getDiagnosisResponseCopy(
  goal: LeadDiagnosisGoal,
  stage: LeadDiagnosisStage,
  urgency: LeadDiagnosisUrgency,
): DiagnosisResponseCopy {
  const overrideKey = `${goal}:${stage}:${urgency}` as DiagnosisOverrideKey;
  const override = diagnosisCriticalOverrides[overrideKey];
  if (override) return override;

  const key = `${goal}:${stage}` as DiagnosisKey;
  const base = diagnosisBaseCopyByGoalStage[key];

  return {
    ...base,
    note: urgencyNote[urgency],
  };
}
