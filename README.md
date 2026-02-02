<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1_b3sP2kmMrwei6ugLM2yUH9WWEPwgBa9

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set environment variables in `.env.local` (copy `.env.local.example`):
   - `STORYBLOK_API_TOKEN` — Storyblok access token (preview or public token as needed)
   - `API_KEY` — Gemini / GenAI API key (if used)
3. Run the app:
   `npm run dev`

Optional: run the Lovel AI initializer to verify your environment:
   `python3 scripts/init_lovel_ai.py`

Note: If you add Storyblok components in the CMS, map them in `services/storyblok.tsx`'s `components` object.
