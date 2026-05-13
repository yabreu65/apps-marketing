# Apps Marketing / Yoryi AI Studio

Landing comercial de `apps-marketing` orientada a conversión para validar mensaje, captar oportunidades y preparar el crecimiento digital por fases.

## Alcance actual

Este repositorio está en **Fase 1 local**: landing comercial frontend-first para revisión y trabajo en entorno local.

## Qué incluye

- Landing comercial (Home)
- Hero, problema, solución, servicios, casos de uso, beneficios y proceso
- CTA a WhatsApp manual (`wa.me`)
- Formulario de contacto con validación frontend
- Mensaje de éxito simulado en formulario
- SEO básico
- Responsive design
- Base visual y técnica para evolución futura

## Qué NO incluye

- AI Lead Assistant
- WhatsApp Cloud API
- Ollama / OpenAI API
- Backend completo
- Base de datos
- Dashboard
- Pagos
- Automatizaciones
- Lead scoring automático
- Deploy (por ahora)

## Stack técnico

- Next.js
- TypeScript
- Tailwind CSS
- App Router (`src/app`)

## Instalación

```bash
npm install
```

## Ejecutar en local

```bash
npm run dev -- --port 3000
```

Abrir: [http://localhost:3000](http://localhost:3000)

## Validaciones

```bash
npm run lint
npm run build
```

## Notas importantes

- No hay backend implementado en esta fase.
- No hay IA activa en runtime.
- No hay integración con WhatsApp Cloud API.
- El formulario tiene envío simulado (sin persistencia).
- El proyecto queda **sin deploy por ahora** (solo uso local).

## Troubleshooting local

### Limpiar caché de Next

```bash
rm -rf .next
```

### Liberar puerto 3000

```bash
lsof -ti:3000 | xargs -r kill -9
```

### Levantar dev en puerto 3000

```bash
npm run dev -- --port 3000
```
