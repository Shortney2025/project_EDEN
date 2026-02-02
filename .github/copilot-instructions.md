# Copilot / AI Agent Instructions for Project EDEN ✅

This file contains concise, actionable guidance for an AI coding agent to be immediately productive in this repository.

## Quick context 🔎
- Small React + TypeScript (Vite) app focused on community reforestation.
- AI integrations live in `services/geminiService.ts` and are used by `components/Scanner.tsx` and `components/ChatBot.tsx`.
- Persistent state saved to `localStorage` keys: `eden_stats`, `eden_trees`.
- Dev commands: `npm install`, `npm run dev`, `npm run build`, `npm run preview` (Vite).

## What to know first (high-value facts) 🎯
- The core AI surface is `analyzePlantImage(base64Image: string)` (see `services/geminiService.ts`). It expects a DataURL and splits with `base64.split(',')[1]` before sending to the GenAI API.
- Expected JSON result shape returned by the scanner flow: { type: string, species?: string, confidence?: number, message: string }. `type` values used in UI: `watered_tree`, `invasive`, `recycling`, `unknown`.
- `ChatBot` (components/ChatBot.tsx) constructs a conversational GenAI call and sets `systemInstruction` to define persona ("Lovel AI"). 
- Some model calls use tooling (`googleSearch`, `googleMaps`) and attach grounding metadata in `response.candidates[0].groundingMetadata.groundingChunks`.

## Files to check for most tasks 🗂️
- AI: `services/geminiService.ts` (models, tooling, response parsing)
- Scanner: `components/Scanner.tsx` (image capture → DataURL → analyzePlantImage)
- Chat: `components/ChatBot.tsx` (chat flow, systemInstruction, simple error fallbacks)
- App shell & state: `App.tsx` (localStorage keys, state shape, UI flow)
- Types & constants: `types.ts`, `constants.tsx` (use these rather than ad-hoc types/strings)
- Package: `package.json` (dependencies: `@google/genai`, `react`, `vite`)

## Common, repo-specific tasks (examples) 🔧
- Fix env var mismatch: README mentions `GEMINI_API_KEY` but code reads `process.env.API_KEY`. Prefer using `API_KEY` or update README + `.env.local` example.
- Add robust parsing guard in `analyzePlantImage` — the code currently does `JSON.parse(response.text)` and falls back to `unknown` on error; ensure the agent returns well-formed JSON or add defensive checks.
- When changing AI prompts or response schemas, update `components/Scanner.tsx` handling (it relies on `result.type`) and unit test parsing logic.

## Patterns & conventions to follow ✨
- Use `types.ts` enums/types for screen names, UserStats, and Tree structures.
- UI uses utility-first CSS classes (Tailwind-like) and Font Awesome icons — keep markup consistent with existing components.
- Data sent to models is often an array of content parts (see `services/geminiService.ts`); preserve that shape when adding prompts.

## Tips for modifications involving models 🧠
- If you add or change a model call, copy the request shape from existing functions (e.g., `generateContent({ model, contents, config })`) so tooling and grounding metadata usage remain compatible.
- When adding tools (`googleSearch`, `googleMaps`), make sure to return `response.candidates?.[0]?.groundingMetadata?.groundingChunks` when you need sources/URLs (see `getEnvironmentalData` and `getLocalResources`).

## Dev & maintenance checklist ✅
- Do not commit API keys — use `.env.local` and document variable name (`API_KEY` vs `GEMINI_API_KEY`).
- Add unit tests for response parsing around `analyzePlantImage` and scanning flows.
- If changing localStorage keys, document the migration or version them (there are no tests for persistence currently).

## Example JSON (from a scanner run) 💬
{
  "type": "invasive",
  "species": "Kudzu",
  "confidence": 0.87,
  "message": "Invasive detected: wear heavy gloves and remove root system deeply."
}

---

If anything is unclear or you'd like different detail (e.g., a PR template for AI changes or example unit tests for `analyzePlantImage`), tell me which section to expand and I'll iterate. 🙌
