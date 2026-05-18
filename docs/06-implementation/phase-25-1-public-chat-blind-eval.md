# Phase 25.1 — Public Chat Blind Evaluation (20 unseen prompts)

## Status

Completed.

## Method

- Evaluated 20 new prompts not reused from previous QA set.
- For each prompt:
  - detect intent (`detectLeadAssistantIntent`)
  - generate response (`buildPublicLeadAssistantResponse`)
  - score with fixed rubric (0-5 each):
    - Clarity
    - Commercial usefulness
    - Conversion push
    - Scope safety
- Script: `scripts/eval-public-chat-blind.ts`
- Raw output: `/tmp/chat-blind-eval.json`

## Average Scores (20 cases)

- Clarity: **4.8 / 5**
- Commercial usefulness: **4.1 / 5**
- Conversion push: **2.6 / 5**
- Scope safety: **2.9 / 5**
- Total: **14.4 / 20**

## Fair Verdict

- The assistant is **strong in clarity and consultive orientation**.
- It is **good enough for guided qualification**, but **still moderate in explicit conversion push**.
- Biggest gap is not tone, but **hard CTA pressure at the right moment** and more explicit guardrail phrasing in some paths.

## Weakest Case Detected

- Case `C19` — “Tengo tráfico pero no convierto, ¿qué revisarían primero?”
- Intent: `seo_marketing`
- Score: **11 / 20**
- Why lower:
  - response is useful but less direct on concrete next action sequence,
  - weaker immediate conversion CTA compared with other intents.

## Priority Improvements

1. Increase conversion push in `seo_marketing` and `not_sure` responses.
2. Add explicit one-line CTA close in all branches after diagnostic value.
3. Strengthen scope-safe wording in non-edge branches (not only pressure questions).

## Iteration v2 (copy tuning applied)

After tuning `seo_marketing` and `not_sure` response branches with stronger close + explicit scope-safe language:

- Clarity: **4.9 / 5**
- Commercial usefulness: **4.1 / 5**
- Conversion push: **3.4 / 5**
- Scope safety: **2.95 / 5**
- Total: **15.35 / 20**

Delta vs first blind run:

- Conversion push improved significantly (**+0.8**)
- No cases below 12/20 in the 20-case set

## Command Used

```bash
npx tsx scripts/eval-public-chat-blind.ts > /tmp/chat-blind-eval.json
npx tsx scripts/eval-public-chat-blind.ts > /tmp/chat-blind-eval-v2.json
```
