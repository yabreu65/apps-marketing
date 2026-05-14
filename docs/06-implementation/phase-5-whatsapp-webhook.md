# Phase 5 — WhatsApp Cloud API Webhook

## Status

Webhook basic setup.

## Public URL

`https://apps-marketing-sage.vercel.app/api/whatsapp/webhook`

## Purpose

Preparar endpoint público para verificación y recepción inicial de eventos WhatsApp.

## Includes

- GET verification endpoint.
- POST receiver endpoint.
- Environment variable `WHATSAPP_VERIFY_TOKEN`.
- Safe minimal logging.
- No persistence.
- No AI.
- No automatic replies.

## Does Not Include

- AI Lead Assistant.
- OpenAI/Ollama.
- Database.
- Dashboard.
- Lead scoring.
- Auto replies.
- WhatsApp message sending.
- Campaigns.
- Automation.

## Local test

### GET verification

```bash
curl "http://localhost:3000/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=change-me&hub.challenge=12345"
```

### POST receiver

```bash
curl -X POST "http://localhost:3000/api/whatsapp/webhook" \
  -H "Content-Type: application/json" \
  -d '{"object":"whatsapp_business_account","entry":[{}]}'
```
