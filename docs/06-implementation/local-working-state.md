# Local Working State — Apps Marketing / Yoryi AI Studio

## Fecha

2026-05-13

## Estado actual

Proyecto en estado funcional local para Fase 1 (landing comercial), sin deploy.

## Qué está implementado

- Baseline técnico Next.js + TypeScript + Tailwind CSS
- Landing visual completa (Hero, Problem, Solution, Services, Use Cases, Benefits, Process, Contact Form, Final CTA, Footer)
- Paleta visual navy / morado / naranja
- CTA WhatsApp manual con enlace `wa.me`
- Formulario de contacto con validación frontend y éxito simulado
- SEO básico en metadata principal
- Responsive y accesibilidad básica
- Sin backend, sin BD, sin IA activa

## Qué falta

- Publicación/deploy (pendiente por decisión explícita)
- Iteraciones de optimización de conversión basadas en uso real
- Evolución a fases futuras (solo después de decisión SDD/ADR)

## Cómo correr localmente

```bash
npm install
npm run dev -- --port 3000
```

URL local: [http://localhost:3000](http://localhost:3000)

## Comandos de validación

```bash
npm run lint
npm run build
```

## Próximos pasos posibles

1. Revisión manual local de copy y conversión con stakeholders.
2. Ajustes menores visuales/UX sin ampliar alcance.
3. Definir criterio de salida para publicación cuando se habilite deploy.
4. Planificar fase posterior solo con aprobación SDD/ADR.

## Confirmación de estado de release

El proyecto queda configurado para trabajo **local** y **sin deploy por ahora**.
