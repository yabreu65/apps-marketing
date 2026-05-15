# Phase 10.8 — API Smoke Tests

## Status

Completed.

## Purpose

Validar manualmente las APIs internas principales con casos positivos y negativos.

## Environment

```bash
docker compose -f docker-compose.local.yml up -d postgres
npm run dev -- --port 3000
```

## Test Cases

### Positive Cases

1. `POST /api/leads` válido → **201**
2. `GET /api/admin/leads` → **200**
3. `PATCH /api/admin/leads/{id}/status` válido → **200**
4. `POST /api/admin/leads/{id}/notes` válido → **201**
5. `GET /api/admin/leads/{id}/notes` válido → **200**
6. `GET /api/admin/leads/{id}/status` (método no permitido) → **405**
7. `PATCH /api/admin/leads/{id}/notes` (método no permitido) → **405**

### Negative Cases

1. `POST /api/leads` JSON inválido → **400**
2. `POST /api/leads` payload inválido → **400**
3. `PATCH /api/admin/leads/{id}/status` con status inválido → **400**
4. `GET /api/admin/leads/{id}/notes` con id inválido → **400**
5. `POST /api/admin/leads/{id}/notes` con contenido inválido → **400**

## Reproducible cURL Examples

### 1) Crear lead válido

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Smoke Lead",
    "email":"smoke@example.com",
    "phone":"+5491112345678",
    "businessType":"Retail",
    "serviceInterest":"MVP SaaS",
    "message":"Necesito validar MVP y flujo comercial.",
    "source":"contact_form"
  }'
```

### 2) Status inválido

```bash
curl -X PATCH http://localhost:3000/api/admin/leads/<lead_id>/status \
  -H "Content-Type: application/json" \
  -d '{"status":"invalid"}'
```

### 3) Nota válida

```bash
curl -X POST http://localhost:3000/api/admin/leads/<lead_id>/notes \
  -H "Content-Type: application/json" \
  -d '{"content":"Smoke test note: contacto inicial realizado."}'
```

### 4) Nota inválida

```bash
curl -X POST http://localhost:3000/api/admin/leads/<lead_id>/notes \
  -H "Content-Type: application/json" \
  -d '{"content":"a"}'
```

## Bug Fixed During Smoke Tests

- Endpoint: `POST /api/leads`
- Problema: devolvía `errors.errors` en validación
- Corrección: ahora devuelve `errors` directo (estructura consistente)

## Scope Notes

- Local/internal only.
- Sin auth/roles.
- Sin IA/OpenAI/Ollama.
- Sin WhatsApp Cloud API sending.
- Sin deploy.
